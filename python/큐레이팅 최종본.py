import numpy as np
import pandas as pd
from PyQt5.QtWidgets import QApplication, QTableWidget, QTableWidgetItem
from sklearn.metrics.pairwise import cosine_similarity
from PyQt5.QtGui import *
from PyQt5.QtCore import *
from PyQt5.QtWidgets import *
import matplotlib.pyplot as plt
import cx_Oracle
from sqlalchemy import create_engine
from konlpy.tag import Okt
from collections import Counter
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from flask import Flask, request
from sklearn.feature_extraction.text import TfidfVectorizer
from flask import jsonify
from geopy.distance import geodesic

app = Flask(__name__)

cx_Oracle.init_oracle_client(lib_dir=r"C:\k_digital\instantclient_19_18")

dsn = cx_Oracle.makedsn('localhost', 1521, 'xe')
conn = cx_Oracle.connect('hr12', 'a1234', dsn=dsn)

engine = create_engine('oracle+cx_oracle://', creator=lambda: conn)

def recommend_by_address(T_id):
    
    # print("세번째 큐레이팅")
    
    # 특정 T_ID 유저의 최근 예약 데이터 가져오기
    user_recent_booking_query = f"SELECT * FROM (SELECT * FROM booking WHERE t_id = '{T_id}' ORDER BY booking_date DESC) WHERE ROWNUM = 1"
    user_recent_booking = pd.read_sql(user_recent_booking_query, engine)
    user_recent_main_code = user_recent_booking['main_code'].values[0]

    # 해당 시설의 main_code를 가지고 main_host 테이블에서 main_address 컬럼 데이터를 가져옵니다.
    main_host_query = f"SELECT main_code, main_address FROM main_host WHERE main_code = '{user_recent_main_code}'"
    main_host = pd.read_sql(main_host_query, engine)
    user_recent_address = main_host['main_address'].values[0]

    # 주소가 비슷한 다른 시설들을 랜덤하게 4개 추천합니다.
    similar_address_query = f"SELECT main_code, main_address FROM main_host WHERE main_address LIKE '%{user_recent_address.split()[0]}%' AND main_code != '{user_recent_main_code}' ORDER BY DBMS_RANDOM.RANDOM"
    similar_address = pd.read_sql(similar_address_query, engine).iloc[:4]

    # print(similar_address)
    # main_code만 출력
    main_code_list = similar_address['main_code'].tolist()
    print(f"인근 시설 : {main_code_list}")
    return main_code_list

    # 가까운 시설 큐레이팅 종료


def recommendsecond(T_id):
        
    query = f"SELECT b.main_code, m.comfort, m.aircon, m.etc FROM booking b JOIN main_con m ON b.main_code=m.main_code WHERE b.t_id = '{T_id}'"
    df = pd.read_sql(query, con=engine)

    # 형태소 분석 함수 정의
    def tokenize(text):
        okt = Okt()
        return okt.morphs(text)

    # 데이터 전처리 및 문서 벡터 생성
    df[['comfort', 'aircon', 'etc']] = df[['comfort', 'aircon', 'etc']].fillna('')
    df['tokenized'] = df[['comfort', 'aircon', 'etc']].apply(lambda x: ' '.join(tokenize(''.join(x.values))), axis=1)

    # TfidfVectorizer 객체 생성
    tfidf_vectorizer = TfidfVectorizer(tokenizer=tokenize, lowercase=False)

    # 문서-단어 행렬 생성
    tfidf_matrix = tfidf_vectorizer.fit_transform(df['tokenized']).toarray()

    #유사도 계산
    similarity_matrix = cosine_similarity(tfidf_matrix)

    # 예약 데이터를 분석할 유저를 설정합니다.
    target_user_reservations = [35]

    # 각 시설에 대해 유사도가 높은 예약 데이터 인덱스를 찾아냅니다.
    similar_reservations = set()
    for i in range(len(df)):
        if i in target_user_reservations:
            continue
        similar_reservations.update(similarity_matrix[i].argsort()[-5:][::-1])

    # 예약한 시설을 제외하고 유사도가 높은 시설 중 상위 4개를 선택합니다.
    recommended_facilities = set()  # set으로 선언합니다.
    for i in similar_reservations:
        if df.loc[i]['main_code'] not in target_user_reservations:
            recommended_facilities.add(df.loc[i]['main_code'])  # 중복을 제거하고 set에 추가합니다.
            if len(recommended_facilities) == 4:
                break
    
    
    a=[]
    
    for i in range(len(recommended_facilities)):
        a.append(str(list(recommended_facilities)[i]))
    # print(a)    
    # 결과를 출력합니다.
    print(f"편의 시설 : {list(recommended_facilities)}")
    # print(len(recommended_facilities))
    return a
    # 편의시설 큐레이팅 종료

# @app.route('/recommend/<int:T_id>')
def recommend_favorite(T_id):
    
    print("요청 들어옴")

    query = """
    SELECT b.T_id, b.main_code, mh.main_category
    FROM booking b
    JOIN main_host mh ON b.main_code = mh.main_code
    WHERE b.T_id = :id
    """

    df = pd.read_sql(query, con=engine, params={'id': T_id})

    okt = Okt()
    

    
    def tokenize(text):
        okt = Okt()
        text_without_slash = text.replace('/', ' ')
        # print(text_without_slash)
        # print(type(text_without_slash))
        return okt.morphs(text)

    df['main_category_tokenized'] = df['main_category'].apply(tokenize)

    user_category_tokens = tokenize(''.join(df.loc[df['t_id'] == T_id, 'main_category']))

    # print(Counter(user_category_tokens).most_common(5))
    other_categories_tokens = [tokenize(''.join(cat)) for cat in df.loc[df['t_id'] != T_id, 'main_category_tokenized']]

    vectorizer = CountVectorizer(tokenizer=lambda x: x, lowercase=False)
    vectorizer.fit([user_category_tokens] + other_categories_tokens)
    X = vectorizer.transform([user_category_tokens] + other_categories_tokens).toarray()

    cosine_sim = cosine_similarity(X)

    reserved_main_code = df.loc[df['t_id'] == T_id, 'main_code'].tolist()

    query = """
    SELECT main_code, main_category
    FROM main_host
    """

    main_df = pd.read_sql(query, con=engine)

    other_main_df = main_df[~main_df['main_code'].isin(reserved_main_code)]
    other_categories = other_main_df['main_category'].apply(tokenize).tolist()
    other_categories.append(user_category_tokens)
    X = vectorizer.transform(other_categories).toarray()
    user_category_vector = X[-1]
    other_categories_vectors = X[:-1]
    cosine_sim = cosine_similarity(X)
    cosine_sim = cosine_sim[:-1, -1]

    max_sim_idx = np.argsort(cosine_sim)[-4:]
    firstreturn = other_main_df.iloc[max_sim_idx]['main_code']
    print(f"유사 시설 : {firstreturn.tolist()}")
    return firstreturn.tolist()
    # 유사한 시설 큐레이팅 종료
    
@app.route('/recommend/<int:T_id>')
def recommend(T_id):
    firstreturn = recommend_favorite(T_id)  # 첫 번째 추천 시스템 호출
    secondreturn = recommendsecond(T_id)  # 두 번째 추천 시스템 호출
    thirdreturn = recommend_by_address(T_id)  # 세 번째 추천 시스템 호출
    return_data = {
        "first": firstreturn,
        "second": list(secondreturn),
        "third": thirdreturn,
    }
    return jsonify(return_data)
    
    # secondreturn = recommendsecond(T_id)
    # print("Asdfasdfasf")
    # print(secondreturn)
    # return_data = {"places":recommendations.tolist(),
    #                "second" : secondreturn,
    #                }
    # return return_data
    

    
    
    
if __name__ == '__main__':
    app.run(debug=True)

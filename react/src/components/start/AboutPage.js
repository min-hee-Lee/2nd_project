const AboutPage = () => {
  return (
    <div>
      <div style={{ position: "relative", top: "-4px", zIndex: 4 }}>
        <img
          src="/images/start/about.jpg"
          alt="not image"
          style={{ width: "100%", height: "auto" }}
        />
        <h3
          style={{
            position: "absolute",
            top: "10%",
            left: "71%",
            zIndex: 9,
            color: "orange",
            fontSize: "50px",
          }}
        >
          Lively라는 이름처럼
          <br /> 고객분들의 삶에,
          <br /> 활기를 보탤 수 있도록 하겠습니다.
        </h3>
        <p
          style={{
            position: "absolute",
            top: "40%",
            left: "74%",
            zIndex: 9,
            color: "white",
            fontSize: "20px",
          }}
        >
          현대 사회에서는 직장 생활과 개인 생활
          <br /> 사이의 균형을 유지하는 것이 <br />
          중요한 이슈 중 하나입니다. Lively는 <br />
          이러한 워 라벨의 중요성을 인식하고, <br />
          스포츠 예약 시스템을 통해 사람들이 <br />
          일상생활에서 스포츠와 운동을 쉽게 즐길
          <br /> 수 있도록 돕는 것을 목표로 합니다. <br />
          <br />
          최근 몇 년간 자기 계발에 대한 관심이 <br />
          증가하면서, 많은 사람들이 운동을 통해 <br />
          건강하고 더 나은 삶을 추구하고 있습니다. <br />
          Lively는 이러한 자기 계발에 대한 관심을 <br />
          반영하여, 예약 가능한 다양한 스포츠 <br />
          시설과 프로그램을 제공하고 있습니다. <br />
          건강과 복지는 우리 삶에서 매우 중요한 <br />
          요소이기 때문에 운동은 건강한 삶을 <br />
          유지하는 데 매우 중요한 역할을 합니다. <br />
          Lively는 이러한 자기 관리에 대한 필요성을 <br />
          인식하고, 스포츠 예약 시스템을 통해 <br />
          스포츠와 운동을 더욱 쉽게 접근하고 즐길
          <br /> 수 있는 환경을 제공합니다.
        </p>
      </div>
    </div>
  );
};

export default AboutPage;

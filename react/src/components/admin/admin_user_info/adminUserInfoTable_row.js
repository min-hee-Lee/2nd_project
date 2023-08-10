const AdminUserInfoTableRow = (props) => {
  const { board } = props;

  console.log(board);

  //console.log(board.main_code);

  return (
    <tr>
      {/* 회원 코드 */}
      <td>{board.t_id}</td>
      {/* 사용자 아이디 */}
      <td>{board.t_username}</td>
      {/* 이메일 */}
      <td>{board.t_email}</td>
      {/* 주소 */}
      <td width={350}>{board.t_address}</td>
      {/* 가입일 */}
      <td>{board.t_createDate}</td>
      {/* 정보 수정일 */}
      <td>{board.t_modiDate}</td>
      {/* 전화번호 */}
      <td>{board.t_phone}</td>
      {/*  */}
      <td>{board.t_bigo}</td>
      {/*  */}
      <td>{board.provider}</td>
      {/*  */}
      <td>{board.providerId}</td>
    </tr>
  );
};

export default AdminUserInfoTableRow;

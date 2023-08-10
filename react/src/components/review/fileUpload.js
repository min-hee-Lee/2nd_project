import { useState } from "react";
import { baseUrl } from "../../apiurl";
import axios from "axios";

const FileUpload = (props) => {
  const { review_code } = props;

  const [tempFile, setTempFile] = useState();

  const handleClick = async (e) => {
    e.preventDefault();

    var data = new FormData();
    for (let i = 0; i < tempFile.length; i++) {
      data.append("files", tempFile[i]);
    }

    const config = {
      //form enctype 으로
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    await axios
      .post(`${baseUrl}/review/file/${review_code}`, data, config)
      .then((response) => console.log(response.data));
  };

  return (
    <form onSubmit={handleClick}>
      <input
        type="file"
        multiple
        onChange={(e) => {
          setTempFile(e.target.files);
        }}
      ></input>
      <button
        style={{
          background: "black",
          color: "white",
          fontWeight: "bolder",
          fontSize: "16px",
          width: "90px",
          height: "50px",
          borderRadius: "20px",
        }}
        type="submit"
      >
        파일찾기
      </button>
    </form>
  );
};

export default FileUpload;

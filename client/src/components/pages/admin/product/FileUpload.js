import React from "react";
import Resizer from "react-image-file-resizer";
import { useSelector } from "react-redux";
import axios from "axios";
import { Avatar, Badge } from "antd";

const FileUpload = ({
  values,
  setValues,
  loading,
  setLoading,
  remove,
  setRemove,
}) => {
  //console.log('FileUpload : ', values)

  const { user } = useSelector((state) => ({ ...state }));

  const handleChangeFile = (e) => {
    const files = e.target.files;
    if (files) {
      setLoading(true);
      let allfileUpload = values.images; //[]
      for (let i = 0; i < files.length; i++) {
        // console.log(files[i])
        Resizer.imageFileResizer(
          files[i],
          720,
          720,
          "JPEG",
          100,
          0,
          (uri) => {
            axios
              .post(
                process.env.REACT_APP_API + "/images",
                {
                  image: uri,
                },
                {
                  headers: {
                    authtoken: user.token,
                  },
                }
              )
              .then((res) => {
                setLoading(false);
                // console.log(res)
                allfileUpload.push(res.data);
                console.log("all file uploaded ", allfileUpload);
                setValues({ ...values, images: allfileUpload });
              })
              .catch((error) => {
                setLoading(false);
                console.log(error.response);
              });
            // console.log(uri)
          },
          "base64"
        );
      }
    }
  };

  const handleRemove = (public_id) => {
    setLoading(true);
    setRemove(true);
    console.log("public id : ", public_id);
    //  const img = values.images

    const { images } = values;
    axios
      .post(
        process.env.REACT_APP_API + "/removeimages",
        { public_id },
        {
          headers: {
            authtoken: user.token,
          },
        }
      )
      .then((res) => {
        setLoading(false);
        setRemove(false);
        const filterImages = images.filter((item) => {
          return item.public_id !== public_id;
        });

        setValues({ ...values, images: filterImages });
        //console.log(res)
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      {remove ? <h5 className="text-danger fw-bold">ກຳລັງລົບ...</h5> : ""}
     
      {values.images &&
        values.images.map((item) => (
          <span className="avatar-item">
            <Badge
              count="x"
              style={{ cursor: "pointer" }}
              onClick={() => handleRemove(item.public_id)}
            >
              <Avatar
                src={item.url}
                shape="square"
                size={120}
                className="mx-2"
              />
            </Badge>
          </span>
        ))}

      <div className="form-group my-2">
        <label htmlFor="">ເລືອກຟາຍ</label>
        <input
          type="file"
          name="file"
          multiple
          accept="image/*"
          className="form-control"
          onChange={handleChangeFile}
        />
      </div>
    </>
  );
};

export default FileUpload;

import { useState, React } from "react";
import './Employee.scss';
import { Modal, Button } from "react-bootstrap";
import { FcPlus } from "react-icons/fc";

const ModalCreateEmployee = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [sex, setSex] = useState("");
    const [email, setEmail] = useState("");
    const [birthday, setBirthday] = useState("");
    const [department, setDepartment] = useState("");

  
    return (
      <>
        <Button variant="primary" onClick={handleShow}>
          Launch demo modal
        </Button>
  
        <Modal 
            show={show} 
            onHide={handleClose} 
            size="xl"
            backdrop="static"
            className="modal-add-emp"
        >
            <Modal.Header closeButton>
                <Modal.Title>Thêm nhân viên mới</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form className="row g-3">
                    <div className="col-md-6">
                        <label className="form-label">Tên tài khoản</label>
                        <input type="text" className="form-control"/>
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Mật khẩu</label>
                        <input type="password" className="form-control"/>
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Họ và tên lót</label>
                        <input type="text" className="form-control"/>
                    </div>
                    <div className="col-md-4">
                        <label className="form-label">Tên</label>
                        <input type="text" className="form-control"/>
                    </div>
                    <div className="col-md-2">
                        <label className="form-label">Giới tính</label>
                        <select className="form-select">
                            <option selected value="MALE">Nam</option>
                            <option value="FEMALE">Nữ</option>
                        </select>
                    </div>
                    <div className="col-6">
                        <label className="form-label">Email</label>
                        <input type="email" className="form-control"/>
                    </div>
                    <div className="col-4">
                        <label className="form-label">Số điện thoại liên hệ</label>
                        <input type="text" className="form-control"/>
                    </div>
                    <div className="col-md-4">
                        <label for="inputCity" className="form-label">Ngày sinh</label>
                        <input type="text" className="form-control"/>
                    </div>
                    <div className="col-md-4">
                        <label for="inputState" className="form-label">Phòng ban</label>
                        <select id="inputState" className="form-select">
                        <option selected value="IT">IT</option>
                        <option value="PERSONEL">Nhân sự</option>
                        <option value="Marketing">Marketing</option>
                        </select>
                    </div>
                    <div className="col-md-12">
                        <label className="form-label label-updload" htmlFor="labelUpload">
                            <FcPlus /> Tải ảnh đại diện</label>
                        <input type="file" id="labelUpload" hidden />
                    </div>
                    <div className="col-md-12 img-preview">
                        <span>Preview Image</span>
                    </div>

                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                Hủy
                </Button>
                <Button variant="primary" onClick={handleClose}>
                Thêm mới
                </Button>
            </Modal.Footer>
        </Modal>
      </>
    );
}

export default ModalCreateEmployee;
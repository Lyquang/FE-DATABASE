const TransferDepartmentModal = ({ show, handleClose, employee, onTransfer }) => {
    const [departmentId, setDepartmentId] = useState("");

    const handleSubmit = () => {
        onTransfer(employee.personelCode, departmentId);
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Chuyển Phòng Ban</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form>
                    <div className="mb-3">
                        <label className="form-label">Mã Nhân Viên</label>
                        <input
                            type="text"
                            className="form-control"
                            value={employee.personelCode}
                            readOnly
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Mã Phòng Ban Mới</label>
                        <input
                            type="number"
                            className="form-control"
                            value={departmentId}
                            onChange={(e) => setDepartmentId(e.target.value)}
                            placeholder="Nhập mã phòng ban"
                        />
                    </div>
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={handleSubmit}
                        disabled={!departmentId}
                    >
                        Chuyển
                    </button>
                </form>
            </Modal.Body>
        </Modal>
    );
};

// import React, { useEffect, useState } from 'react';
// import './EmployeeInfor.scss';
// import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaBriefcase, FaBuilding } from 'react-icons/fa';
// import { useDispatch, useSelector } from 'react-redux';

// const EmployeeInfor = () => {

//   const {personnel} = useSelector((state) => state);

//   // State for profile data
//   const [profile, setProfile] = useState({
//     name: '',
//     position: '',
//     phone: '',
//     email: '',
//     address: '',
//     department: '',
//     profileImage: '', // New state for the profile image
//   });

//   useEffect(() => {
//     if(personnel?.data){
//       console.log("personnel info >>>", personnel.data);
//       setProfile((prevProfile) => ({
//         ...prevProfile,
//         name: `${personnel.data.lastName} ${personnel.data.firstName}`,
//         phone: `${personnel.data.phone}`,
//         email: `${personnel.data.email}`,
//         address: `${personnel.data.street} ${personnel.data.city}`,
//        department: `${personnel.data.departmentName}`,
//        position: `${personnel.data.personelCode}`,
//         profileImage: `${personnel.data.avatar}`
//       }))
//     }
//   }, [personnel])

//   // State to track if in edit mode
//   const [isEditing, setIsEditing] = useState(false);

//   // Function to handle form input changes
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setProfile((prevProfile) => ({
//       ...prevProfile,
//       [name]: value,
//     }));
//   };

//   // Function to handle profile image upload
//   const handleImageChange = async (e) => {
//     const file = e.target.files[0];
//     console.log("file >>>", file);

//     if (file) {
//         const formData = new FormData();
//         formData.append('image', file);
//         console.log("formData >>>>", formData);

//         const imageUrl = URL.createObjectURL(file);
//         setProfile((prevProfile) => ({
//             ...prevProfile,
//             profileImage: imageUrl,
//         }));

//     } 


//   };

//   // Function to toggle edit mode
//   const toggleEditMode = () => {
//     setIsEditing(!isEditing);
//   };

//   // Function to save changes
//   const handleSave = () => {
//     setIsEditing(false);
//     // Here, you would typically send the updated profile data to a server.
//     console.log('Updated profile:', profile);
//   };

//   return (
//     <div className="employee-profile">
//       {/* Profile Header */}
//       <div className="profile-header">
//         <img
//           src={profile.profileImage || "default_profile_picture.png"} // Use a default image if none is uploaded
//           alt="Employee Profile"
//           className="profile-image"
//         />
//         <div className="header-text">
//           {isEditing ? (
//             <input
//               type="text"
//               name="name"
//               value={profile.name}
//               onChange={handleInputChange}
//               className="editable-input"
//             />
//           ) : (
//             <h2 className="employee-name">{profile.name}</h2>
//           )}
//           {isEditing ? (
//             <input
//               type="text"
//               name="position"
//               value={profile.position}
//               onChange={handleInputChange}
//               className="editable-input"
//             />
//           ) : (
//             <p className="employee-position">{profile.position}</p>
//           )}
//         </div>
//       </div>

//       {/* Profile Image Upload */}
//       {isEditing && (
//         <div className="image-upload">
//           <input
//             type="file"
//             accept="image/*"
//             onChange={handleImageChange}
//             className="file-upload"
//             id="file-upload"
//           />
//           <label htmlFor="file-upload" className="upload-button">
//             <i className="fas fa-upload"></i> Upload Profile Picture
//           </label>
//         </div>
//       )}

//       {/* Profile Details */}
//       <div className="profile-details">
//         <div className="info-group">
//           <h3>Thông tin liên lạc</h3>
//           <p>
//             <FaPhone />{' '}
//             {isEditing ? (
//               <input
//                 type="text"
//                 name="phone"
//                 value={profile.phone}
//                 onChange={handleInputChange}
//                 className="editable-input"
//               />
//             ) : (
//               profile.phone
//             )}
//           </p>
//           <p>
//             <FaEnvelope />{' '}
//             {isEditing ? (
//               <input
//                 type="text"
//                 name="email"
//                 value={profile.email}
//                 onChange={handleInputChange}
//                 className="editable-input"
//               />
//             ) : (
//               profile.email
//             )}
//           </p>
//           <p>
//             <FaMapMarkerAlt />{' '}
//             {isEditing ? (
//               <input
//                 type="text"
//                 name="address"
//                 value={profile.address}
//                 onChange={handleInputChange}
//                 className="editable-input"
//               />
//             ) : (
//               profile.address
//             )}
//           </p>
//         </div>

//         <div className="info-group">
//           <h3>Thông tin công việc</h3>
//           <p><FaBriefcase /> Phòng ban: {profile.department}</p>
//           {/* <p><FaBuilding /> Địa chỉ phòng ban: {profile.officeLocation}</p>
//           <p>Mã số nhân viên: {profile.employeeID}</p> */}
//         </div>
//       </div>

//       {/* Edit and Save Buttons */}
//       <div className="button-group">
//         {isEditing ? (
//           <button className="save-button" onClick={handleSave}>Lưu</button>
//         ) : (
//           <button className="edit-button" onClick={toggleEditMode}>Chỉnh sửa</button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default EmployeeInfor;

import React, { useEffect, useState } from "react";
import "./EmployeeInfor.scss";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaBriefcase } from "react-icons/fa";

const EmployeeInfor = () => {
  // State for profile data
  const [profile, setProfile] = useState({
    name: "",
    position: "",
    phone: "",
    email: "",
    address: "",
    department: "",
    profileImage: "",
  });

  const [isEditing, setIsEditing] = useState(false); // Track edit mode
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(""); // Track error state

  useEffect(() => {
    // Fetch data from API
    const fetchEmployeeData = async () => {
      try {
        const token = localStorage.getItem("token");
        const accountId = localStorage.getItem("accountId");

        if (!token || !accountId) {
          setError("Authentication token or account ID not found");
          setLoading(false);
          return;
        }

        const response = await fetch(
          `http://localhost:8080/api/employee/account?id=${accountId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch employee data");
        }

        const data = await response.json();
        setProfile({
          name: `${data.lastName} ${data.firstName}`,
          phone: data.phone,
          email: data.email,
          address: `${data.street}, ${data.city}`,
          department: data.departmentName,
          position: data.personelCode,
          profileImage: data.avatar,
        });
        setLoading(false);
      } catch (err) {
        console.error("Error fetching employee data:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchEmployeeData();
  }, []);

  // Toggle edit mode
  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  // Save changes
  const handleSave = () => {
    setIsEditing(false);
    console.log("Updated profile:", profile);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="employee-profile">
      {/* Profile Header */}
      <div className="profile-header">
        <img
          src={profile.profileImage || "default_profile_picture.png"}
          alt="Employee Profile"
          className="profile-image"
        />
        <div className="header-text">
          {isEditing ? (
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={(e) =>
                setProfile({ ...profile, name: e.target.value })
              }
              className="editable-input"
            />
          ) : (
            <h2 className="employee-name">{profile.name}</h2>
          )}
          {isEditing ? (
            <input
              type="text"
              name="position"
              value={profile.position}
              onChange={(e) =>
                setProfile({ ...profile, position: e.target.value })
              }
              className="editable-input"
            />
          ) : (
            <p className="employee-position">{profile.position}</p>
          )}
        </div>
      </div>

      {/* Profile Details */}
      <div className="profile-details">
        <div className="info-group">
          <h3>Thông tin liên lạc</h3>
          <p>
            <FaPhone /> {profile.phone}
          </p>
          <p>
            <FaEnvelope /> {profile.email}
          </p>
          <p>
            <FaMapMarkerAlt /> {profile.address}
          </p>
        </div>
        <div className="info-group">
          <h3>Thông tin công việc</h3>
          <p>
            <FaBriefcase /> Phòng ban: {profile.department}
          </p>
        </div>
      </div>

      {/* Edit and Save Buttons */}
      <div className="button-group">
        {isEditing ? (
          <button className="save-button" onClick={handleSave}>
            Lưu
          </button>
        ) : (
          <button className="edit-button" onClick={toggleEditMode}>
            Chỉnh sửa
          </button>
        )}
      </div>
    </div>
  );
};

export default EmployeeInfor;



const UsersList = () => {
  return (
    <div className="users">
      <div className="image-div">
        <img
          className="chat-image"
          src="https://i.pinimg.com/564x/76/ef/b9/76efb9495d394564fd5aa8466c397ff3.jpg"
          alt=""
          style={{ width: "40px", height: "40px" }}
        />
      </div>
      <div className="chat-info">
        <div className="chat-info-title">
          <p className="chat-name">Baseer</p>
          <p>Joined on 02-04-2024</p>
        </div>

      </div>
    </div>
  )
}

export default UsersList

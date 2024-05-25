import { ReactNode, createContext, useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/Auth";




// Chat Room Section Toggle Context
type ChatRoomSectionToggleType = {
  toggleState: number;
  setToggleState: (index: number) => void;

  profileNavbarToggle: boolean,
  setProfileNavbarToggle: (e: boolean) => void
};
const ChatRoomSectionToggleInitValue = {
  toggleState: 1,
  setToggleState: () => {
    throw new Error("context not initialed");
  },
  profileNavbarToggle: false,
  setProfileNavbarToggle: () => {
    throw new Error('Context not initialized');
  }
};


type childrenProps = {
  children: ReactNode;
};
export const ChatRoomSectionToggle = createContext<ChatRoomSectionToggleType>(
  ChatRoomSectionToggleInitValue
);
export const ChatRoomSectionToggleProvider = ({ children }: childrenProps) => {
  const [profileNavbarToggle, setProfileNavbarToggle] = useState<boolean>(false)

  const [toggleState, setToggleState] = useState<number>(1);

  return (
    <ChatRoomSectionToggle.Provider value={{ toggleState, setToggleState, profileNavbarToggle, setProfileNavbarToggle  }}>
      {children}
    </ChatRoomSectionToggle.Provider>
  );
};

// ========================= End Chat Room Section Toggle Context =========================




// Users Fetch from Firestore Database  

type UserType = {
  id: string;
  displayName: string;
  email: string;
  photoURL: string;
};

type UsersContextType = {
  users: UserType[] | null;
  // setUsers: (data: UserType[] | null) => void;

};

const usersContextInitValue: UsersContextType = {

  users: null,
  // setUsers: () => {
  //   throw new Error('Context not initialized');
  // },

};

type UserChildrenProps = {
  children: ReactNode;
}

export const UsersDataContext = createContext<UsersContextType>(usersContextInitValue);

export const UsersContextProvider = ({ children }: UserChildrenProps) => {
  const [users, setUsers] = useState<UserType[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'users')); // Make sure 'db' is properly initialized
        const dataArray: UserType[] = [];
        querySnapshot.forEach((doc) => {
          dataArray.push(doc.data() as UserType);
        });
        setUsers(dataArray);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchData();
  }, []);

  return <UsersDataContext.Provider value={{ users}}>
    {children}
    </UsersDataContext.Provider>;
};
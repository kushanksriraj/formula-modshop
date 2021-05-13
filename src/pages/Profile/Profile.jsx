import { useAuth } from "../../hooks";

export const Profile = () => {
  const { logUserOut, userProfile } = useAuth();

  return (
    <div className="top-margin border-1 h-100">
      <div className="top-margin w-7 m-h-auto flex-col place-center p-6 box-shadow">
        <div className="heading-2 p-b-3">My account</div>
        <div className="material-icons-round color-1 font-big">
          account_circle
        </div>
        <div className="heading-2">{userProfile.name}</div>
        <div className="flex space-between m-v-6">
          <div className="text-bold p-h-2">Email:</div>
          <div className="text-center">{userProfile.email}</div>
        </div>
        <div className="flex flex-end w-100 m-v-4">
          <button className="btn p-h-4 p-v-2 font-4" onClick={logUserOut}>
            Log out
          </button>
        </div>
      </div>
    </div>
  );
};

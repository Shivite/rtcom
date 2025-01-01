//hoc for authenticated users onrole based

const user = {
  isAuthenticated: true,
  role: "admin",
};

const withAuth = (WrappedCom, role) => {
  return (props) => {
    if (!user.isAuthenticated) {
      return <div> Your are not authenticated!</div>;
    }
    let msg = "";

    return <WrappedCom {...props} role={role} />;
  };
};

const AdminComp = (props) => <div> {props.role} component</div>;
const UserComp = (props) => <div>{props.role} component</div>;

const AuthAdmin = withAuth(AdminComp, "admin");
const AuthUser = withAuth(UserComp, "user");

const Hoc = () => {
  return (
    <>
      <AuthAdmin />
      <AuthUser />
    </>
  );
};

export default Hoc;

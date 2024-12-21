import SideNav from "./features/sidenav/sidenav";

const App = () => {
  return (
    <div className="flex">
      <SideNav />
      <main className="flex-1 p-8"></main>
    </div>
  );
};

export default App;

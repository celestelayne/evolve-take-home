import { Outlet } from 'react-router-dom';

function App() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <div className="flex flex-col gap-8">
        <Outlet />
      </div>
    </main>
  );
}

export default App;

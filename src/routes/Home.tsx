import { Link } from 'react-router-dom';

const CONCEPTS = [
  { path: '/answer', label: 'Answer' },
  // { path: '/flow', label: 'Flow' },
  // { path: '/statement', label: 'Statement' },
  // { path: '/guided', label: 'Guided' },
];

function Home() {
  return (
    <>
      <header>
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
          Explore
        </h1>
        <p className="mt-1 text-sm text-slate-600">
          Product directions built from the same booking-detail primitives.
        </p>
      </header>

      <nav aria-label="Concepts">
        <ul className="flex flex-col gap-2">
          {CONCEPTS.map((c) => (
            <li key={c.path}>
              <Link
                to={c.path}
                className="inline-block text-slate-900 underline decoration-slate-300 underline-offset-4 hover:decoration-slate-600"
              >
                {c.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}

export default Home;

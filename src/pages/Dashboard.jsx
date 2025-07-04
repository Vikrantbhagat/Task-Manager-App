// import { useEffect, useState } from 'react';
// import api from '../api/axios';
// import { Link } from 'react-router-dom';
// import NavBar from '../components/NavBar';

// export default function Dashboard() {
//   const [tasks, setTasks] = useState([]);
//   const [filter, setFilter] = useState('All');

//   const load = async () => {
//     const { data } = await api.get('/tasks');
//     setTasks(data);
//   };
//   useEffect(() => { load(); }, []);

//   const filtered = tasks.filter(t => filter === 'All' ? true : filter === 'Completed' ? t.is_completed : !t.is_completed);

//   const toggle = async t => {
//     await api.put(`/tasks/${t.id}`, { is_completed: !t.is_completed });
//     load();
//   };
//   const remove = async id => {
//     await api.delete(`/tasks/${id}`);
//     load();
//   };

//   return (
//     <>
//       <NavBar />
//       <div className="container mt-4">
//         <div className="d-flex justify-content-between align-items-center">
//           <h2>Your Tasks</h2>
//           <Link className="btn btn-primary" to="/add-task">+ Add Task</Link>
//         </div>
//         <div className="my-3">
//           <select value={filter} onChange={e => setFilter(e.target.value)} className="form-select w-auto d-inline">
//             <option>All</option>
//             <option>Completed</option>
//             <option>Pending</option>
//           </select>
//         </div>
//         <table className="table">
//           <thead><tr><th>Title</th><th>Due</th><th>Priority</th><th>Status</th><th></th></tr></thead>
//           <tbody>
//             {filtered.map(t => (
//               <tr key={t.id} className={t.is_completed ? 'table-success' : ''}>
//                 <td>{t.title}</td>
//                 <td>{t.due_date?.slice(0,10)}</td>
//                 <td>{t.priority}</td>
//                 <td>{t.is_completed ? '✔️' : '⏳'}</td>
//                 <td>
//                   <button className="btn btn-sm btn-secondary me-1" onClick={() => toggle(t)}>Toggle</button>
//                   <Link className="btn btn-sm btn-info me-1" to={`/edit-task/${t.id}`}>Edit</Link>
//                   <button className="btn btn-sm btn-danger" onClick={() => remove(t.id)}>Delete</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </>
//   );
// }



import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import NavBar from '../components/NavBar';
import api from '../api/axios';
import './Dashboard.css';          // ⬅️  new styles

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [statusFilter, setStatusFilter] = useState('All');
  const [search, setSearch] = useState('');

  /* ── fetch once ── */
  const load = async () =>
    api.get('/tasks').then(r => setTasks(r.data));
  useEffect(() => { load(); }, []);

  /* ── helpers ── */
  const matchesSearch = t =>
    t.title.toLowerCase().includes(search.toLowerCase()) ||
    (t.description || '').toLowerCase().includes(search.toLowerCase());

  const matchesStatus = t =>
    statusFilter === 'All'
      ? true
      : statusFilter === 'Completed'
      ? t.is_completed
      : !t.is_completed;

  const view = tasks.filter(t => matchesSearch(t) && matchesStatus(t));

  /* ── actions ── */
  const toggle = async t => {
    await api.put(`/tasks/${t.id}`, { is_completed: !t.is_completed });
    toast.success('Status updated');
    load();
  };

  const remove = async id => {
    if (!window.confirm('Delete this task?')) return;
    await api.delete(`/tasks/${id}`);
    toast.success('Task deleted succsefully');
    load();
  };

  /* ── render ── */
  return (
    <>
      <NavBar />

          <div className="page-wrap py-4">

        {/* header & add‑button */}
        <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
          <h2 className="m-0 fw-bold">Your Tasks</h2>
          <Link className="btn btn-primary" to="/add-task">
            + Add Task
          </Link>
        </div>

        {/* search + status */}
        <div className="row g-3 mb-4">
          <div className="col-12 col-md-7 col-lg-8">
            <input
              className="form-control"
              placeholder="Search by title or description"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div className="col-12 col-md">
            <select
              className="form-select"
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
            >
              <option>All</option>
              <option>Completed</option>
              <option>Pending</option>
            </select>
          </div>
        </div>

        {/* grid of cards */}
        <div className="row g-4">
          {view.length ? (
            view.map(t => (
              <div key={t.id} className="col-12 col-md-6 col-lg-4">
                <div
                  className={`card h-100 shadow-sm ${
                    t.is_completed ? 'border-success' : 'border-light'
                  }`}
                >
                  <div className="card-body d-flex flex-column">
                    {/* title + badge */}
                    <h5 className="card-title d-flex justify-content-between">
                      {t.title}
                      <span
                        className={`badge ${
                          t.is_completed
                            ? 'bg-success'
                            : 'bg-warning text-dark'
                        }`}
                      >
                        {t.is_completed ? 'Done' : 'Pending'}
                      </span>
                    </h5>

                    {/* description */}
                    {t.description && (
                      <p className="small text-muted mb-2">
                        {t.description}
                      </p>
                    )}

                    {/* meta */}
                    <ul className="list-unstyled small mb-4">
                      <li>
                        <strong>Due:</strong>{' '}
                        {t.due_date?.slice(0, 10) || '-'}
                      </li>
                      <li>
                        <strong>Priority:</strong> {t.priority}
                      </li>
                    </ul>

                    {/* action buttons */}
                    <div className="mt-auto d-flex gap-2">
                      <button
                        className="btn btn-outline-secondary btn-sm flex-grow-1"
                        onClick={() => toggle(t)}
                      >
                        {t.is_completed ? 'Undo' : 'Done'}
                      </button>

                      <Link
                        to={`/edit-task/${t.id}`}
                        className="btn btn-outline-info btn-sm flex-grow-1"
                      >
                        Edit
                      </Link>

                      <button
                        className="btn btn-outline-danger btn-sm flex-grow-1"
                        onClick={() => remove(t.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-muted">No tasks found. Add your task here.</p>
            
          )}
        </div>
      </div>
    </>
  );
}

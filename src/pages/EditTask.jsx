// import { useState, useEffect } from 'react';
// import api from '../api/axios';
// import { useNavigate, useParams } from 'react-router-dom';
// import NavBar from '../components/NavBar';

// export default function EditTask() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [task, setTask] = useState(null);
//   useEffect(() => { api.get('/tasks').then(r => setTask(r.data.find(t => t.id == id))); }, []);
//   const handleChange = e => setTask({ ...task, [e.target.name]: e.target.value });
//   const submit = async e => {
//     e.preventDefault();
//     await api.put(`/tasks/${id}`, task);
//     navigate('/dashboard');
//   };
//   if (!task) return null;
//   return (
//     <>
//       <NavBar />
//       <div className="container col-md-6 mt-4">
//         <h3>Edit Task</h3>
//         <form onSubmit={submit}>
//           <input className="form-control my-2" name="title" value={task.title} onChange={handleChange} />
//           <textarea className="form-control my-2" name="description" value={task.description} onChange={handleChange} />
//           <input className="form-control my-2" type="date" name="due_date" value={task.due_date?.slice(0,10)} onChange={handleChange} />
//           <select className="form-select my-2" name="priority" value={task.priority} onChange={handleChange}>
//             <option>Low</option><option>Medium</option><option>High</option>
//           </select>
//           <button className="btn btn-primary">Update</button>
//         </form>
//       </div>
//     </>
//   );
// }



import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import NavBar from '../components/NavBar';
import api from '../api/axios';
import '../tasks/TaskForm.css';

export default function EditTask() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);

  /* fetch task once */
  useEffect(() => {
    api.get('/tasks').then(r => setTask(r.data.find(t => t.id == id)));
  }, [id]);

  const handle = e => setTask({ ...task, [e.target.name]: e.target.value });

  const submit = async e => {
    e.preventDefault();
    try {
      await api.put(`/tasks/${id}`, task);
      toast.success('Task updated!');
      navigate('/dashboard');
    } catch {
      toast.error('Update failed');
    }
  };

  if (!task) return null;

  /* ── JSX ─────────────────────────────────────────────────────── */
  return (
    <>
      <NavBar />
     <div className="taskform-wrapper">
      <div className="card task-card p-4 w-100 mx-auto" style={{maxWidth: 520}}>
        <h4 className="fw-bold mb-3 text-center">Edit Task</h4>

          <form onSubmit={submit} className="vstack gap-3">
            {/* title */}
            <div className="form-floating">
              <input
                className="form-control"
                id="edit-title"
                name="title"
                value={task.title}
                onChange={handle}
                required
              />
              <label htmlFor="edit-title">Title</label>
            </div>

            {/* description */}
            <div className="form-floating">
              <textarea
                className="form-control"
                style={{ height: 100 }}
                id="edit-desc"
                name="description"
                value={task.description}
                onChange={handle}
              />
              <label htmlFor="edit-desc">Description</label>
            </div>

            {/* due & priority */}
            <div className="row g-3">
              <div className="col-md-6 form-floating">
                <input
                  type="date"
                  className="form-control"
                  id="edit-due"
                  name="due_date"
                  value={task.due_date?.slice(0, 10) || ''}
                  onChange={handle}
                />
                <label htmlFor="edit-due">Due Date</label>
              </div>

              <div className="col-md-6">
                <label className="form-label mb-1">Priority</label>
                <div className="d-flex gap-2">
                  {['Low', 'Medium', 'High'].map(p => (
                    <div key={p} className="priority-option">
                      <input
                        type="radio"
                        className="btn-check"
                        name="priority"
                        id={`edit-prio-${p}`}
                        value={p}
                        checked={task.priority === p}
                        onChange={handle}
                      />
                      <label
                        className="btn btn-outline-primary btn-sm"
                        htmlFor={`edit-prio-${p}`}
                      >
                        {p}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* action buttons */}
            <div className="d-flex gap-2 mt-2">
              <button type="submit" className="btn btn-primary flex-grow-1">
                Update Task
              </button>

              {/* NEW  Cancel */}
              <button
                type="button"
                className="btn btn-outline-secondary flex-grow-1"
                onClick={() => navigate('/dashboard')}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}


// import { useState } from 'react';
// import api from '../api/axios';
// import { useNavigate } from 'react-router-dom';
// import NavBar from '../components/NavBar';

// export default function AddTask() {
//   const [task, setTask] = useState({ title: '', description: '', due_date: '', priority: 'Medium' });
//   const navigate = useNavigate();
//   const handleChange = e => setTask({ ...task, [e.target.name]: e.target.value });
//   const submit = async e => {
//     e.preventDefault();
//     await api.post('/tasks', task);
//     navigate('/dashboard');
//   };
//   return (
//     <>
//       <NavBar />
//       <div className="container col-md-6 mt-4">
//         <h3>Add Task</h3>
//         <form onSubmit={submit}>
//           <input className="form-control my-2" name="title" placeholder="Title" onChange={handleChange} />
//           <textarea className="form-control my-2" name="description" placeholder="Description" onChange={handleChange} />
//           <input className="form-control my-2" type="date" name="due_date" onChange={handleChange} />
//           <select className="form-select my-2" name="priority" onChange={handleChange}>
//             <option>Low</option><option>Medium</option><option>High</option>
//           </select>
//           <button className="btn btn-success">Save</button>
//         </form>
//       </div>
//     </>
//   );
// }




import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import NavBar from '../components/NavBar';
import api from '../api/axios';
import '../tasks/TaskForm.css';

export default function AddTask() {
  const navigate = useNavigate();
  const [task, setTask] = useState({
    title: '',
    description: '',
    due_date: '',
    priority: 'Medium',
  });

  const handle = e => setTask({ ...task, [e.target.name]: e.target.value });

  const submit = async e => {
    e.preventDefault();
    try {
      await api.post('/tasks', task);
      toast.success('Task added!');
      navigate('/dashboard');
    } catch {
      toast.error('Could not add task');
    }
  };

  /* ── JSX ───────────────────────────────────────────────────────── */
  return (
    <>
      <NavBar />
       <div className="taskform-wrapper">
      <div className="card task-card p-4 w-100 mx-auto" style={{maxWidth: 520}}>
        <h4 className="fw-bold mb-3 text-center">Add Task</h4>

          <form onSubmit={submit} className="vstack gap-3">
            {/* title */}
            <div className="form-floating">
              <input
                className="form-control"
                id="add-title"
                name="title"
                placeholder="Title"
                value={task.title}
                onChange={handle}
                required
              />
              <label htmlFor="add-title">Title</label>
            </div>

            {/* description */}
            <div className="form-floating">
              <textarea
                className="form-control"
                style={{ height: 100 }}
                id="add-desc"
                name="description"
                placeholder="Description"
                value={task.description}
                onChange={handle}
              />
              <label htmlFor="add-desc">Description</label>
            </div>

            {/* due & priority */}
            <div className="row g-3">
              <div className="col-md-6 form-floating">
                <input
                  type="date"
                  className="form-control"
                  id="add-due"
                  name="due_date"
                  value={task.due_date}
                  onChange={handle}
                />
                <label htmlFor="add-due">Due Date</label>
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
                        id={`prio-${p}`}
                        autoComplete="off"
                        value={p}
                        checked={task.priority === p}
                        onChange={handle}
                      />
                      <label
                        className="btn btn-outline-primary btn-sm"
                        htmlFor={`prio-${p}`}
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
              <button type="submit" className="btn btn-success flex-grow-1">
                Save Task
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


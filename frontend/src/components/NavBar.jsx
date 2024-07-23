import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function NavBar() {
    const { isAuthenticated, user, logout } = useAuth();

    return (
        <nav className='bg-zinc-700 my-3 flex flex-col md:flex-row justify-between py-5 px-10 rounded-lg '>
            <Link to={isAuthenticated ? "/tasks" : "/"}>
                <h1 className='text-2xl font-bold text-center mb-2'>Tasks Manager</h1>
            </Link>
            <ul className='flex flex-wrap gap-x-1 gap-y-2 md:gap-y-0'>
                {isAuthenticated ? (
                    <>
                        <li className='w-full md:w-auto'>
                            <Link className='block bg-indigo-500 px-4 py-2 rounded-sm text-center md:inline-block' to='/add-task'>Agregar Tarea</Link>
                        </li>
                        <li className='w-full md:w-auto'>
                            <Link className='block bg-indigo-500 px-4 py-2 rounded-sm text-center md:inline-block' to='/tasks/completed'>Tareas terminadas</Link>
                        </li>
                        <li className='w-full md:w-auto'>
                            <Link className='block bg-indigo-500 px-4 py-2 rounded-sm text-center md:inline-block' to='/' onClick={() => { logout() }}>Cerrar Sessión</Link>
                        </li>
                    </>
                ) : (
                    <>
                        <li className='w-full md:w-auto'>
                            <Link className='block bg-indigo-500 px-4 py-2 rounded-sm text-center md:inline-block' to='/login'>Login</Link>
                        </li>
                        <li className='w-full md:w-auto'>
                            <Link className='block bg-indigo-500 px-4 py-2 rounded-sm text-center md:inline-block' to='/register'>Register</Link>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
}

export default NavBar;

import React, { useEffect, useState, useMemo } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { getRole } from './layout.service';
import { getOneUser, getUsers } from './Users/services/users.service';

export const Layout = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [userRol, setUserRol] = useState(null);
  const [invalidRole, setInvalidRole] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(true);
  const [userName, setUserName] = useState();

  const logout = () => {
    localStorage.removeItem("Token");
    localStorage.removeItem("rolId");
    localStorage.removeItem("User");
    navigate('/');
  };

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  // Función para normalizar nombres de roles
  const normalizeRoleName = (name) => {
    if (!name) return '';
    const lowerName = name.toLowerCase().trim();
    
    // Parte de administrador
    if (lowerName.includes('admin')) return 'administrador';
    if (lowerName.includes('administradora')) return 'administrador';
    if (lowerName.includes('superadmin')) return 'administrador';
    if (lowerName.includes('superadministrador')) return 'administrador';
    if (lowerName.includes('superadmintradora')) return 'administrador';
    if (lowerName.includes('gerente')) return 'administrador';
    if (lowerName.includes('director')) return 'administrador';

    // Parte de proveedor
    if (lowerName.includes('empresa')) return 'proveedor';
    if (lowerName.includes('proveedora')) return 'proveedor';
    if (lowerName.includes('abastecedor')) return 'proveedor';
    if (lowerName.includes('abastecedora')) return 'proveedor';
    if (lowerName.includes('provisor')) return 'proveedor';
    if (lowerName.includes('provisora')) return 'proveedor';
    if (lowerName.includes('suministrador')) return 'proveedor';
    if (lowerName.includes('suministradora')) return 'proveedor';
    if (lowerName.includes('distribuidor')) return 'proveedor';
    if (lowerName.includes('distribuidora')) return 'proveedor';
    if (lowerName.includes('agente')) return 'proveedor';
    
    return lowerName;
  };

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        setLoading(true);
        setInvalidRole(false);
        
        const rolId = localStorage.getItem('rolId');
        const userR = JSON.parse(localStorage.getItem('User')) 
               
        setUserName(userR.fullName)
        if (!rolId) {
          setInvalidRole(true);
          return;
        }
        
        const response = await getRole(parseInt(rolId));
        
        setUserRol(response.data);
        const res2 = await getUsers()
        const admin = res2.data.find(e => e.role.name === "Administrador")
        setUser(admin)
        
        const normalizedRole = normalizeRoleName(response.data.name);
        
        if (!['administrador', 'proveedor'].includes(normalizedRole)) {
          setInvalidRole(true);
        }
      } catch (error) {
        setInvalidRole(true);
      } finally {
        setLoading(false);
      }
    };

    fetchUserRole();
  }, []);

  // Memoizar los links del sidebar según el rol
  const navLinks = useMemo(() => {
    if (!userRol || invalidRole) return [];
    
    const normalizedRole = normalizeRoleName(userRol.name);
    const userR = JSON.parse(localStorage.getItem('User'));

    const roleLinks = {
      administrador: [
        <li key="usuario" className="nav-item">
          <Link to={`/dashboard/Usuario/${userR.id}`} className="nav-link text-white">Mi Perfil</Link>
        </li>,
        <li key="usuarios" className="nav-item">
          <Link to="/dashboard/Usuarios" className="nav-link text-white">Usuarios</Link>
        </li>,
        <li key="roles" className="nav-item">
          <Link to="/dashboard/Roles" className="nav-link text-white">Roles</Link>
        </li>,
        <li key="compañias" className="nav-item">
          <Link to="/dashboard/Compañias" className="nav-link text-white">Compañías</Link>
        </li>,
        <li key="productos" className="nav-item">
          <Link to="/dashboard/Productos" className="nav-link text-white">Productos</Link>
        </li>,
        <li key="categorias" className="nav-item">
          <Link to="/dashboard/Categorias" className="nav-link text-white">Categorías</Link>
        </li>,
        <li key="infoemacion" className="nav-item">
        <Link to="/dashboard/Informacion" className="nav-link text-white">Informacion Landig</Link>
      </li>
      ],
      proveedor: [
        <li key="perfil" className="nav-item">
          <Link to={`/dashboard/Usuario/${userR.id}`} className="nav-link text-white">Mi Perfil</Link>
        </li>,
        <li key="compañias" className="nav-item">
          <Link to="/dashboard/Categorias" className="nav-link text-white">Categorías</Link>
        </li>,
        <li key="productos" className="nav-item">
          <Link to="/dashboard/Productos" className="nav-link text-white">Productos</Link>
        </li>
      ]
    };

    return roleLinks[normalizedRole] || [];
  }, [userRol, invalidRole]);

  return (
    <div className="min-vh-100 d-flex flex-column">
      {/* Navbar superior */}
      <div className="bg-light p-3 d-flex flex-column flex-sm-row align-items-start align-items-sm-center justify-content-between gap-2 border-bottom">
        <div className="d-flex align-items-center gap-2">
          <button className="btn btn-outline-primary d-md-none" onClick={toggleSidebar}>
            ☰
          </button>
          <p className="h5 fw-semibold m-0">Bienvenido {JSON.parse(localStorage.getItem("User"))?.fullName || 'Usuario'}</p>
        </div>
        <button onClick={logout} className="btn btn-danger">
          Salir
        </button>
      </div>

      <div className="d-flex flex-grow-1 flex-column flex-md-row">
        {/* Sidebar */}
        <nav
          className={`bg-primary text-white p-3 flex-column ${isSidebarOpen ? 'd-flex' : 'd-none'} d-md-flex`}
          style={{ width: "220px" }}
        >
          <ul className="nav flex-column">
            {!loading && navLinks}
            {loading && <li className="nav-item text-white">Cargando...</li>}
          </ul>
        </nav>

        {/* Contenido principal */}
        <div className="flex-grow-1 p-3">
          <Outlet />
          
          {/* Mensaje de error para roles no válidos */}
          {!loading && invalidRole && (
            <div className="alert alert-warning mt-3" role="alert">
              Rol no reconocido. Por favor, comuníquese con el administrador {user.email} para asignarle un rol válido.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default function AdminProfile() {
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
      
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        
        {/* Foto Admin */}
        <div className="flex flex-col items-center">
          <img
            src="https://i.pravatar.cc/150?img=12"
            alt="Admin"
            className="w-24 h-24 rounded-full border-4 border-blue-500"
          />

          <h1 className="text-2xl font-bold mt-4">
            Administrador
          </h1>

          <p className="text-gray-500">
            admin@gmail.com
          </p>

          <span className="mt-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
            Admin
          </span>
        </div>

        {/* Información */}
        <div className="mt-6 space-y-4">
          
          <div className="border rounded-lg p-3">
            <p className="text-gray-400 text-sm">Nombre</p>
            <p className="font-semibold">Juliana Admin</p>
          </div>

          <div className="border rounded-lg p-3">
            <p className="text-gray-400 text-sm">Correo</p>
            <p className="font-semibold">admin@gmail.com</p>
          </div>

          <div className="border rounded-lg p-3">
            <p className="text-gray-400 text-sm">Rol</p>
            <p className="font-semibold">Administrador del Sistema</p>
          </div>

        </div>

        {/* Botones */}
        <div className="flex gap-3 mt-6">
          <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
            Editar Perfil
          </button>

          <button className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600">
            Cerrar Sesión
          </button>
        </div>

      </div>
    </div>
  );
}
import ManagerUsuarios from './ManagerUsuarios.js';

const manager = new ManagerUsuarios();

const env = async () => {
    let primeraConsulta = await manager.consultarUsuarios();
    console.log(primeraConsulta);

    const usuario = {
        nombre: 'Sofia',
        apellido: 'Barco',
        edad: 30,
        curso: 'Backend',
    };

    let result = await manager.crearUsuario(usuario);
    console.log(result);

    
};

env();

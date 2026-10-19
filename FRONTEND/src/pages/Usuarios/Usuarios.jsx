import { useState, useEffect } from "react";
import { Search, UserPlus, Pencil, Trash2, RefreshCw } from "lucide-react";
import { createUsuario, getUsuarios, getUsuario, updateUsuario, deleteUsuario } from "../../services/usuarioService";

function Usuarios() {
    const [usuarios, setUsuarios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [idUsuario, setIdUsuario] = useState("");
    const [formulario, setFormulario] = useState({ nome: "", email: "", senha: "" });
    const [editandoId, setEditandoId] = useState(null);

    const carregarUsuarios = async () => {
        setLoading(true);
        setError(null);
        try {
            const dados = await getUsuarios();
            setUsuarios(Array.isArray(dados) ? dados : []);
        } catch (error) {
            console.error("Erro ao buscar usuários:", error);
            setError("Erro ao buscar usuários. Por favor, tente novamente.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        carregarUsuarios();
    }, []);

    const handleBuscarUsuario = async () => {
        if (!idUsuario.trim()) {
            carregarUsuarios();
            return;
        }

        try {
            const usuario = await getUsuario(idUsuario);
            setUsuarios(usuario ? [usuario] : []);
            setError(null);
        } catch (error) {
            console.error("Erro ao buscar usuário:", error);
            setError("Erro ao buscar usuário. Por favor, tente novamente.");
        }
    };

    const handleSalvarUsuario = async (event) => {
        event.preventDefault();
        setError(null);
        try {
            if (editandoId) {
                await updateUsuario(editandoId, { nome: formulario.nome, email: formulario.email });
            } else {
                await createUsuario(formulario);
            }
            setFormulario({ nome: "", email: "", senha: "" });
            setEditandoId(null);
            await carregarUsuarios();
        } catch (error) {
            console.error("Erro ao atualizar usuário:", error);
            setError("Não foi possível salvar o usuário. Por favor, tente novamente.");
        }
    };

    const handleEditarUsuario = (usuario) => {
        setEditandoId(usuario.id);
        setFormulario({ nome: usuario.nome || "", email: usuario.email || "", senha: "" });
    };

    const handleDeletarUsuario = async (id) => {
        try {
            const confirmDelete = window.confirm("Tem certeza que deseja deletar este usuário?");
            if (!confirmDelete) {
                return; // Sai da função se o usuário cancelar a exclusão
            }
            await deleteUsuario(id);
            await carregarUsuarios();
        } catch (error) {
            console.error("Erro ao deletar usuário:", error);
            setError("Erro ao deletar usuário. Por favor, tente novamente.");
        }
    };

    return (
        <div className="usuarios-page">
            <div className="page-heading">
                <div>
                    <span className="eyebrow">GERENCIAMENTO</span>
                    <h1>Usuários</h1>
                    <p>Criação e Gerenciamento de Usuários.</p>
                </div>
                <button className="secondary-button" type="button" onClick={carregarUsuarios} title="Atualizar lista">
                    <RefreshCw size={17} /> Atualizar
                </button>
            </div>

            <section className="usuarios-toolbar">
                <div className="search-group">
                    <label htmlFor="id-usuario">Consultar por ID</label>
                    <div className="search-row">
                        <input id="id-usuario" type="number" min="1" value={idUsuario} onChange={(event) => setIdUsuario(event.target.value)} placeholder="Ex.: 1" />
                        <button className="secondary-button" type="button" onClick={handleBuscarUsuario} title="Buscar usuário">
                            <Search size={17} /> Buscar
                        </button>
                    </div>
                </div>
                <form className="usuario-form" onSubmit={handleSalvarUsuario}>
                    <label>{editandoId ? "Editar usuário" : "Novo usuário"}</label>
                    <div className="form-row">
                        <input required value={formulario.nome} onChange={(event) => setFormulario({ ...formulario, nome: event.target.value })} placeholder="Nome" />
                        <input required type="email" value={formulario.email} onChange={(event) => setFormulario({ ...formulario, email: event.target.value })} placeholder="E-mail" />
                        {!editandoId && <input required type="password" value={formulario.senha} onChange={(event) => setFormulario({ ...formulario, senha: event.target.value })} placeholder="Senha" />}
                        <button className="primary-button" type="submit"><UserPlus size={17} /> {editandoId ? "Salvar" : "Cadastrar"}</button>
                        {editandoId && <button className="cancel-button" type="button" onClick={() => { setEditandoId(null); setFormulario({ nome: "", email: "", senha: "" }); }}>Cancelar</button>}
                    </div>
                </form>
            </section>

            {loading && <p>Carregando usuários...</p>}
            {error && <p className="error-message">{error}</p>}

            {!loading && !error && usuarios.length === 0 && <div className="empty-state">Nenhum usuário encontrado.</div>}
            <div className="usuarios-grid">
                {usuarios.map((usuario) => (
                    <article className="usuario-card" key={usuario.id}>
                        <div className="usuario-avatar">{(usuario.nome || "?").charAt(0).toUpperCase()}</div>
                        <div className="usuario-info">
                            <h2>{usuario.nome}</h2>
                            <p>{usuario.email}</p>
                            <span>ID #{usuario.id}</span>
                        </div>
                        <div className="card-actions">
                            <button className="icon-button" type="button" onClick={() => handleEditarUsuario(usuario)} title="Editar usuário"><Pencil size={17} /></button>
                            <button className="icon-button danger" type="button" onClick={() => handleDeletarUsuario(usuario.id)} title="Excluir usuário"><Trash2 size={17} /></button>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    );
}

export default Usuarios;

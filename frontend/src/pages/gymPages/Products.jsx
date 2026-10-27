import StatCard from "../../components/cards/StatCard";
import SearchBar from "../../components/layout/SearchBar";
import ProductCard from "../../components/cards/ProductCard";
import { useEffect, useState } from "react";
import Button from "../../components/buttons/Button";
import useGym from "../../hooks/useGym"
import { apiFetch } from "../../services/api";
import showError from "../../components/messages/showError.js"
import Spinner from "../../components/layout/Spinner.jsx"
import Select from "../../components/layout/Select.jsx"
import authorize from "../../components/messages/authorize.js"
import { NavLink } from "react-router-dom";

function Products() {

    const { gym } = useGym();
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [mode, setMode] = useState(1);
    const [filters, setFilters] = useState({
        status: "all",
        orderBy: "AA"
    })


    const [stats, setStats] = useState([
        { title: "Todos los productos", value: "0" },
        { title: "Valor del inventario", value: "$" + "0" },
        { title: "Stock bajo", value: "0", type: "advertencia" },
        { title: "Agotados", value: "0", type: "peligro" },
    ]);
    const [text, setText] = useState("");


    const getProducts = async (textSearch = "", filters) => {

        try {
            const data = await apiFetch(`/products/getProducts/${gym?.id}?status=${filters.status}&orderBy=${filters.orderBy}&text=${textSearch}`);
            if (data.success) {
                setProducts(data.products);
                setLoading(false);
            }
            else {
                setProducts([])
            }
        }
        catch (error) {
            showError(error.message);
        }

    }

    const getStats = async () => {
        try {
            const data = await apiFetch(`/products/getStats/${gym?.id}`);
            if (data.success) {
                const { stats } = data;
                setStats([
                    { title: "Todos los productos", value: stats.total },
                    { title: "Valor del inventario", value: `$${stats.totalValue}` },
                    { title: "Stock bajo", value: stats.lowStock, type: "advertencia" },
                    { title: "Agotados", value: stats.outOfStock, type: "peligro" },
                ]);
            }
        }
        catch (error) {
            showError(error.message);
        }

    }

    const handleText = (e) => {
        const value = e.target.value;
        setText(value);
        if (value.length >= 3 || value.length === 0) {
            try {
                getProducts(value, filters);
            } catch (error) {
                showError(error.message);
            }
        }

    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        const updatedFilters = {
            ...filters,
            [name]: value
        };
        setFilters(updatedFilters);

        getProducts(text, updatedFilters);

    }

    useEffect(() => {

        if (!gym?.id) return;

        getProducts(text, filters);
        getStats();

    }, [gym?.id])


    return (
        <>
            <div className="flex justify-between mb-3">
                <h1>Productos</h1>
                <div className="space-x-3">
                    <NavLink to="/products/addnewproduct">
                        <Button>+ Agregar nuevo producto</Button>
                    </NavLink>
                    <Button onClick={mode ? () => {
                        authorize({
                            title: "Cambiando al modo de administracion",
                            onConfirm: () => setMode(!mode)
                        })
                    } : () => setMode(!mode)}>{mode ? "Administrar productos" : "Vender Productos"}</Button>
                    <Button>Carrito</Button>
                </div>
            </div>


            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

                {
                    stats.map((stat, index) => (
                        <StatCard key={index} title={stat.title} value={stat.value} type={stat.type} />
                    ))
                }

            </div>

            <div className="grid grid-cols-3 my-4 space-x-2">
                <div className="col-span-2">
                    <SearchBar placeholder="Buscar por nombre o SKU..." text={text} onChange={handleText} />
                </div>
                <div className="flex space-x-2">
                    <Select name="status" items={filters} onChange={handleChange} placeholder="-- Estado --">
                        <option value="all">Todo</option>
                        <option value="lowStock">Stock Bajo</option>
                        <option value="outOfStock">Sin Stock</option>
                    </Select>
                    <Select name="orderBy" items={filters} onChange={handleChange} placeholder="-- Ordenar --">
                        <option value="AA">Alfabetico (A - Z)</option>
                        <option value="AD">Alfabetico (Z - A)</option>
                        <option value="SA">Stock (0 - 999)</option>
                        <option value="SD">Stock (999 - 0)</option>
                        <option value="PA">Precio ($0 - $9999)</option>
                        <option value="PD">Precio ($9999 - $0)</option>

                    </Select>
                </div>


            </div>


            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
                {
                    loading ? <Spinner isLoading={loading} /> :
                        products.map((product) => (
                            <ProductCard key={product.id} name={product.name} description={product.description}
                                price={product.price} photo_path={product.photo_path} sku={product.sku}
                                isActive={product.isActive} stock={product.stock} mode={mode} />
                        ))
                }
            </div>

        </>


    );
}

export default Products;
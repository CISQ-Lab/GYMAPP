import StatCard from "../../components/cards/StatCard";
import SearchBar from "../../components/layout/SearchBar";
import ProductCard from "../../components/cards/ProductCard";
import { useEffect, useState } from "react";
import Button from "../../components/buttons/Button";
import useGym from "../../hooks/useGym"
import { apiFetch } from "../../services/api";
import showError from "../../components/messages/showError.js"
import Spinner from "../../components/layout/Spinner.jsx"

function Products() {

    const { gym } = useGym();
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [stats, setStats] = useState([
        { title: "Todos los productos", value: "0" },
        { title: "Valor del inventario", value: "$" + "0" },
        { title: "Stock bajo", value: "0", type: "advertencia" },
        { title: "Agotados", value: "0", type: "peligro" },
    ]);
    const [text, setText] = useState("");


    const getProducts = async () => {
        try {
            const data = await apiFetch(`/products/getProducts/${gym?.id}`);
            if (data.success) {
                setProducts(data.products);
                setLoading(false);
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

    const handleText = async (e) => {
        const value = e.target.value;
        setText(value);
        if (value.length >= 3) {
            try {
                const data = await apiFetch(`/products/search/${gym?.id}?text=${value}`);
                if (data.success && data.products) {
                    setProducts(data.products);
                } else {
                    setProducts([]);
                }
            } catch (error) {
                showError(error.message);
            }
        } else {
            try {
                getProducts();
            } catch (error) {
                showError(error.message);
            }
        }

    }

    useEffect(() => {

        if (!gym?.id) return;

        getProducts();
        getStats();

    }, [gym?.id])





    return (
        <>
            <div className="flex justify-between mb-3">
                <h1>Productos</h1>
                <div className="space-x-3">
                    <Button>+ Agregar nuevo producto</Button>
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

            <SearchBar placeholder="Buscar por nombre o SKU..." text={text} onChange={handleText} />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
                {
                    loading ? <Spinner isLoading={loading} /> :
                        products.map((product) => (
                            <ProductCard key={product.id} name={product.name} description={product.description}
                                price={product.price} photo_path={product.photo_path} sku={product.sku}
                                isActive={product.isActive} stock={product.stock} />
                        ))
                }
            </div>

        </>


    );
}

export default Products;
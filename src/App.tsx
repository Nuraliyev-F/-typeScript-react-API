import { useEffect, useState } from "react";
import { ProductCard } from "./components/ProductCard";

interface Category {
    id: number;
    name: string;
    image: string;
}

interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: Category;
    images: string[];
}

const App = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [selectedCategory, setSelectedCategory] = useState<string>("All");
    const [searchQuery, setSearchQuery] = useState<string>("");

    useEffect(() => {
        setStatus("loading");

        Promise.all([
            fetch("https://api.escuelajs.co/api/v1/products").then((res) => res.json()),
            fetch("https://api.escuelajs.co/api/v1/categories").then((res) => res.json()),
        ])
            .then(([productsData, categoriesData]: [Product[], Category[]]) => {
                setProducts(productsData);
                setCategories(categoriesData);
                setStatus("success");
            })
            .catch(() => {
                setStatus("error");
            });
    }, []);

    // Kategoriya va qidiruv bo'yicha filter qilish
    const filteredProducts = products.filter((p) => {
        const matchesCategory = selectedCategory === "All" || p.category.name === selectedCategory;
        const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
            <h1>Product Catalog</h1>

            {/* Qidiruv inputi */}
            <div style={{ marginBottom: "15px" }}>
                <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                    style={{ padding: "8px", width: "250px", borderRadius: "4px", border: "1px solid #ccc" }}
                />
            </div>

            {/* Kategoriya tugmalari */}
            <div style={{ display: "flex", gap: "10px", marginBottom: "20px", flexWrap: "wrap" }}>
                <button
                    onClick={() => setSelectedCategory("All")}
                    style={{
                        padding: "6px 12px",
                        background: selectedCategory === "All" ? "#007bff" : "#f0f0f0",
                        color: selectedCategory === "All" ? "#fff" : "#000",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                    }}
                >
                    All
                </button>

                {categories.map((cat) => (
                    <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.name)}
                        style={{
                            padding: "6px 12px",
                            background: selectedCategory === cat.name ? "#007bff" : "#f0f0f0",
                            color: selectedCategory === cat.name ? "#fff" : "#000",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer",
                        }}
                    >
                        {cat.name}
                    </button>
                ))}
            </div>

            {/* Holatlar */}
            {status === "loading" && <p>Yuklanmoqda...</p>}
            {status === "error" && <p style={{ color: "red" }}>Xatolik yuz berdi</p>}

            {/* Mahsulotlar ro'yxati */}
            {status === "success" && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", marginTop: "20px" }}>
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))
                    ) : (
                        <p>Hech qanday mahsulot topilmadi.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default App;
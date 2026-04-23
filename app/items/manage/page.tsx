'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Eye as EyeIcon, ChevronLeft, ChevronRight, Edit, X } from 'lucide-react';
import { useAuthStore } from '@/stores/authStore';
import { useProducts } from '@/hooks/useProducts';
import type { Product } from '@/types';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { formatPrice } from '@/lib/utils';
import toast from 'react-hot-toast';

const ITEMS_PER_PAGE = 5;

const categories = [
  { value: 'clothing', label: 'Clothing' },
  { value: 'accessories', label: 'Accessories' },
  { value: 'home', label: 'Home' },
  { value: 'electronics', label: 'Electronics' },
  { value: 'beauty', label: 'Beauty' },
];

export default function ManageProductsPage() {
  const { user, loading: authLoading } = useAuthStore();
  const { products: allProducts, deleteProduct, updateProduct, loading: productsLoading } = useProducts();
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [editForm, setEditForm] = useState({
    title: '',
    shortDescription: '',
    fullDescription: '',
    category: 'clothing',
    price: '',
    rating: 4,
    imageUrl: '',
  });
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      router.replace('/login');
    }
  }, [user, authLoading, router]);

  const openEditModal = (product: Product) => {
    setEditProduct(product);
    setEditForm({
      title: product.title,
      shortDescription: product.shortDescription,
      fullDescription: product.fullDescription,
      category: product.category,
      price: String(product.price),
      rating: product.rating,
      imageUrl: product.imageUrl,
    });
  };

  const handleUpdate = async () => {
    if (!editProduct) return;
    setEditing(true);
    try {
      await updateProduct(editProduct.id, {
        title: editForm.title,
        shortDescription: editForm.shortDescription,
        fullDescription: editForm.fullDescription,
        category: editForm.category as Product['category'],
        price: Number(editForm.price),
        rating: editForm.rating,
        imageUrl: editForm.imageUrl,
      });
      setEditProduct(null);
      toast.success('Product updated!', {
        icon: '✅',
        style: { borderRadius: '8px', background: '#10b981', color: '#fff' },
      });
    } catch {
      toast.error('Failed to update product.', {
        style: { borderRadius: '8px', background: '#ef4444', color: '#fff' },
      });
    } finally {
      setEditing(false);
    }
  };

  const userProducts = allProducts;

  if (authLoading || !user || productsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-brand-amber border-t-transparent rounded-full" />
      </div>
    );
  }

  const totalPages = Math.ceil(userProducts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProducts = userProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(id);
        toast.success('Product deleted successfully!', {
          icon: '🗑️',
          style: {
            borderRadius: '8px',
            background: '#10b981',
            color: '#fff',
          },
        });
      } catch {
        toast.error('Failed to delete product.', {
          style: {
            borderRadius: '8px',
            background: '#ef4444',
            color: '#fff',
          },
        });
      }
    }
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-gray-50 py-8"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-3xl lg:text-4xl font-bold text-brand-navy">
              Manage Products
            </h1>
            <p className="text-brand-slate mt-1">
              {userProducts.length} products
            </p>
          </div>
          <Link href="/items/add">
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Product
            </Button>
          </Link>
        </div>

        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-brand-slate uppercase tracking-wider">
                    Image
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-brand-slate uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-brand-slate uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-brand-slate uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-brand-slate uppercase tracking-wider">
                    Rating
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-brand-slate uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {paginatedProducts.map((product, index) => (
                  <tr
                    key={product.id}
                    className={index % 2 === 1 ? 'bg-gray-50' : 'bg-white'}
                  >
                    <td className="px-6 py-4">
                      <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100">
                        <Image
                          src={product.imageUrl}
                          alt={product.title}
                          width={48}
                          height={48}
                          className="object-cover"
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-medium text-brand-navy">{product.title}</p>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant="default" className="capitalize">
                        {product.category}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-medium text-brand-amber">
                        {formatPrice(product.price)}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-brand-navy">{product.rating}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openEditModal(product)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Link href={`/items/${product.id}`}>
                          <Button variant="ghost" size="sm">
                            <EyeIcon className="w-4 h-4" />
                          </Button>
                        </Link>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(product.id)}
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-between px-6 py-4 border-t">
              <p className="text-sm text-brand-slate">
                Showing {startIndex + 1}-{Math.min(startIndex + ITEMS_PER_PAGE, userProducts.length)} of {userProducts.length}
              </p>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <span className="text-sm text-brand-navy">
                  Page {currentPage} of {totalPages}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}
        </Card>

        {userProducts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-brand-slate mb-4">
              You haven&apos;t added any products yet.
            </p>
            <Link href="/items/add">
              <Button>Add Your First Product</Button>
            </Link>
          </div>
        )}
      </div>

      <AnimatePresence>
        {editProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setEditProduct(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-brand-navy">Edit Product</h2>
                  <button
                    onClick={() => setEditProduct(null)}
                    className="p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-brand-navy mb-1.5 block">
                      Title
                    </label>
                    <input
                      type="text"
                      value={editForm.title}
                      onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                      className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-brand-navy focus:outline-none focus:ring-2 focus:ring-brand-amber"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-brand-navy mb-1.5 block">
                      Short Description
                    </label>
                    <input
                      type="text"
                      value={editForm.shortDescription}
                      onChange={(e) => setEditForm({ ...editForm, shortDescription: e.target.value })}
                      className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-brand-navy focus:outline-none focus:ring-2 focus:ring-brand-amber"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-brand-navy mb-1.5 block">
                      Full Description
                    </label>
                    <textarea
                      value={editForm.fullDescription}
                      onChange={(e) => setEditForm({ ...editForm, fullDescription: e.target.value })}
                      rows={3}
                      className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-brand-navy focus:outline-none focus:ring-2 focus:ring-brand-amber resize-none"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-brand-navy mb-1.5 block">
                      Category
                    </label>
                    <select
                      value={editForm.category}
                      onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                      className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-brand-navy focus:outline-none focus:ring-2 focus:ring-brand-amber"
                    >
                      {categories.map((cat) => (
                        <option key={cat.value} value={cat.value}>
                          {cat.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-brand-navy mb-1.5 block">
                      Price
                    </label>
                    <input
                      type="number"
                      value={editForm.price}
                      onChange={(e) => setEditForm({ ...editForm, price: e.target.value })}
                      className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-brand-navy focus:outline-none focus:ring-2 focus:ring-brand-amber"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-brand-navy mb-1.5 block">
                      Rating
                    </label>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setEditForm({ ...editForm, rating: star })}
                          className={`w-10 h-10 rounded-lg border transition-colors ${
                            editForm.rating >= star
                              ? 'bg-brand-amber text-brand-navy border-brand-amber'
                              : 'bg-white text-brand-slate border-gray-200 hover:border-brand-amber'
                          }`}
                        >
                          {star}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-brand-navy mb-1.5 block">
                      Image URL
                    </label>
                    <input
                      type="url"
                      value={editForm.imageUrl}
                      onChange={(e) => setEditForm({ ...editForm, imageUrl: e.target.value })}
                      className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-brand-navy focus:outline-none focus:ring-2 focus:ring-brand-amber"
                    />
                  </div>

                  {editForm.imageUrl && (
                    <div className="aspect-video relative rounded-lg overflow-hidden bg-gray-100">
                      <img
                        src={editForm.imageUrl}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>

                <div className="flex gap-3 mt-6">
                  <Button
                    variant="secondary"
                    className="flex-1"
                    onClick={() => setEditProduct(null)}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="flex-1"
                    loading={editing}
                    onClick={handleUpdate}
                  >
                    Save Changes
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
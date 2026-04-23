'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Plus, Trash2, Eye as EyeIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { useAuthStore } from '@/stores/authStore';
import { useProducts } from '@/hooks/useProducts';
import type { Product } from '@/types';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { formatPrice } from '@/lib/utils';
import toast from 'react-hot-toast';

const ITEMS_PER_PAGE = 5;

export default function ManageProductsPage() {
  const { user, loading: authLoading } = useAuthStore();
  const { products: allProducts, deleteProduct, loading: productsLoading } = useProducts();
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (!authLoading && !user) {
      router.replace('/login');
    }
  }, [user, authLoading, router]);

  const userProducts = user 
    ? allProducts.filter((p) => p.addedBy === user.uid || !p.addedBy)
    : allProducts;

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
    </motion.div>
  );
}
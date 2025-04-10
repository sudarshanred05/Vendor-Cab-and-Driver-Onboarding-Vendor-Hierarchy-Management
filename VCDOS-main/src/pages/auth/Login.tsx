import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Building2 } from 'lucide-react';
import { useAuthRedirect } from '../../utils/useAuthRedirect';
import { vendorLevelPermissions } from '../../types/vendor';
import Password from 'antd/es/input/Password';

interface LoginFormData {
  email: string;
  password: string;
  vendorId: string;
}

export default function Login() {
  useAuthRedirect();
  const location = useLocation();
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
    vendorId: '',
  });
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const from = (location.state as any)?.from?.pathname || '/';

  // Embedded mock login logic
  const mockVendors = [
    {
      id: '1',
      name: 'Super Vendor',
      email: 'super@vendor.com',
      password: 'super@123',
      level: 'super' as const,
      permissions: vendorLevelPermissions.super.defaultPermissions,
      token: 'super-token',
    },
    {
      id: '2',
      name: 'Regional Vendor',
      email: 'regional@vendor.com',
      password: 'regional@123',
      level: 'regional' as const,
      permissions: vendorLevelPermissions.regional.defaultPermissions,
      token: 'regional-token',
    },
    {
      id: '3',
      name: 'City Vendor',
      email: 'city@vendor.com',
      password: 'city@123',
      level: 'city' as const,
      permissions: vendorLevelPermissions.city.defaultPermissions,
      token: 'city-token',
    },
    {
      id: '4',
      name: 'Local Vendor',
      email: 'local@vendor.com',
      password: 'local@123',
      level: 'local' as const,
      permissions: vendorLevelPermissions.local.defaultPermissions,
      token: 'local-token',
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await new Promise(res => setTimeout(res, 1000)); // simulate delay

      const vendor = mockVendors.find(
        v => v.id === formData.vendorId && v.email === formData.email && v.password === formData.password
      );

      if (!vendor) {
        throw new Error('Invalid credentials');
      }

      login(vendor); // pass vendor to auth context
      navigate(from, { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Building2 className="h-12 w-12 text-blue-600" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Vendor Management System
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Sign in to your account
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="vendorId" className="block text-sm font-medium text-gray-700">
                Select Role
              </label>
              <select
                id="vendorId"
                name="vendorId"
                value={formData.vendorId}
                onChange={handleChange}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                required
              >
                <option value="">Select a role</option>
                <option value="1">Super Vendor</option>
                <option value="2">Regional Vendor</option>
                <option value="3">City Vendor</option>
                <option value="4">Local Vendor</option>
              </select>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={formData.password}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            {error && (
              <div className="text-red-600 text-sm">{error}</div>
            )}

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Signing in...' : 'Sign in'}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Demo Credentials</span>
            </div>
            <div className="mt-6 space-y-2 text-sm text-gray-500">
              <p>Super Admin: super@vendor.com</p>
              <p>Regional Admin: regional@vendor.com</p>
              <p>City Admin: city@vendor.com</p>
              <p>Local Admin: local@vendor.com</p>
              <p className="text-xs">Password: (use respective role-based password)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

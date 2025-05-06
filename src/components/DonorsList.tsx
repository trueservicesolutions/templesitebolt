import React, { useState, useEffect } from 'react';
import { parse } from 'papaparse';
import { Search, ChevronLeft, ChevronRight, ArrowUpDown } from 'lucide-react';

interface Donor {
  Index: string;
  'Customer Id': string;
  'First Name': string;
  'Last Name': string;
  'Company': string;
  'City': string;
  'Phone 1': string;
  'Phone 2': string;
  'Email': string;
  'Subscription Date': string;
  'Website': string;
}

const PAGE_SIZE = 10;

const DonorsList: React.FC = () => {
  const [donors, setDonors] = useState<Donor[]>([]);
  const [filteredDonors, setFilteredDonors] = useState<Donor[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Donor;
    direction: 'asc' | 'desc';
  } | null>(null);

  useEffect(() => {
    const loadDonors = async () => {
      try {
        const response = await fetch('/uploads/customers-20mr.csv');
        const text = await response.text();
        const result = parse(text, { header: true });
        const parsedDonors = result.data as Donor[];
        setDonors(parsedDonors);
        setFilteredDonors(parsedDonors);
      } catch (error) {
        console.error('Error loading donors:', error);
      }
    };

    loadDonors();
  }, []);

  useEffect(() => {
    let result = [...donors];

    if (searchTerm) {
      result = result.filter((donor) =>
        Object.values(donor).some((value) =>
          value.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    if (sortConfig) {
      result.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }

    setFilteredDonors(result);
    setCurrentPage(1);
  }, [searchTerm, sortConfig, donors]);

  const totalPages = Math.ceil(filteredDonors.length / PAGE_SIZE);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const paginatedDonors = filteredDonors.slice(startIndex, startIndex + PAGE_SIZE);

  const handleSort = (key: keyof Donor) => {
    setSortConfig({
      key,
      direction:
        sortConfig?.key === key && sortConfig.direction === 'asc'
          ? 'desc'
          : 'asc',
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search donors..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-cream">
              {Object.keys(donors[0] || {}).map((key) => (
                <th key={key} className="px-4 py-2 text-left">
                  <button
                    className="flex items-center space-x-1 text-maroon font-medium"
                    onClick={() => handleSort(key as keyof Donor)}
                  >
                    <span>{key}</span>
                    <ArrowUpDown className="h-4 w-4" />
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedDonors.map((donor) => (
              <tr key={donor['Customer Id']} className="border-b border-gray-100 hover:bg-cream/20">
                {Object.entries(donor).map(([key, value]) => (
                  <td key={key} className="px-4 py-3">
                    {key === 'Email' ? (
                      <a href={`mailto:${value}`} className="text-maroon hover:text-gold">
                        {value}
                      </a>
                    ) : key === 'Phone 1' || key === 'Phone 2' ? (
                      <a href={`tel:${value}`} className="text-maroon hover:text-gold">
                        {value}
                      </a>
                    ) : key === 'Website' ? (
                      <a href={value} target="_blank" rel="noopener noreferrer" className="text-maroon hover:text-gold">
                        {value}
                      </a>
                    ) : (
                      value
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <div className="text-sm text-gray-500">
          Showing {startIndex + 1} to {Math.min(startIndex + PAGE_SIZE, filteredDonors.length)} of{' '}
          {filteredDonors.length} donors
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="p-2 rounded-full hover:bg-cream disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          
          <span className="px-4 py-2 rounded-full bg-cream">
            {currentPage} of {totalPages}
          </span>
          
          <button
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            className="p-2 rounded-full hover:bg-cream disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DonorsList;
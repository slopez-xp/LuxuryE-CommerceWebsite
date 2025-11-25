
import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

interface Boutique {
  id: string;
  name: string;
  address: string;
}

const BoutiquesTable: React.FC = () => {
  const [boutiques, setBoutiques] = useState<Boutique[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBoutiques = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase.from('boutiques').select('*');
        if (error) {
          throw error;
        }
        setBoutiques(data || []);
      } catch (error)
      {
        console.error('Error fetching boutiques:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBoutiques();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="grid grid-cols-3 gap-4 p-4 border-b border-rolex-gold">
        <div className="font-bold">Name</div>
        <div className="font-bold">Address</div>
        <div className="font-bold">Actions</div>
      </div>
      {boutiques.map((boutique) => (
        <div key={boutique.id} className="grid grid-cols-3 gap-4 p-4 items-center hover:bg-white/5">
          <div>{boutique.name}</div>
          <div>{boutique.address}</div>
          <div className="flex gap-4">
            <button className="text-blue-500 hover:text-blue-700">
              Edit
            </button>
            <button className="text-red-500 hover:text-red-700">
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BoutiquesTable;

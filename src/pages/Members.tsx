
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Button from '@/components/Button';
import { Plus, Search, Edit, Trash2, CheckCircle, XCircle, MoreHorizontal } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

// Mock data for members
type Member = {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'member';
  status: 'active' | 'inactive';
  joinDate: string;
  avatar?: string;
};

const mockMembers: Member[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin',
    status: 'active',
    joinDate: '10/01/2023',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    id: '2',
    name: 'Jean Dupont',
    email: 'jean@example.com',
    role: 'member',
    status: 'active',
    joinDate: '15/01/2023',
    avatar: 'https://randomuser.me/api/portraits/men/42.jpg',
  },
  {
    id: '3',
    name: 'Marie Martin',
    email: 'marie@example.com',
    role: 'member',
    status: 'active',
    joinDate: '22/01/2023',
    avatar: 'https://randomuser.me/api/portraits/women/28.jpg',
  },
  {
    id: '4',
    name: 'Pierre Petit',
    email: 'pierre@example.com',
    role: 'member',
    status: 'inactive',
    joinDate: '05/02/2023',
    avatar: 'https://randomuser.me/api/portraits/men/56.jpg',
  },
  {
    id: '5',
    name: 'Sophie Durand',
    email: 'sophie@example.com',
    role: 'member',
    status: 'active',
    joinDate: '18/02/2023',
    avatar: 'https://randomuser.me/api/portraits/women/39.jpg',
  },
];

const Members: React.FC = () => {
  const [members, setMembers] = useState<Member[]>(mockMembers);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredMembers, setFilteredMembers] = useState<Member[]>(mockMembers);
  const [showDropdownId, setShowDropdownId] = useState<string | null>(null);
  const { isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();

  // Filter members based on search
  useEffect(() => {
    const results = members.filter(
      member =>
        member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredMembers(results);
  }, [members, searchTerm]);

  // Redirect if not admin
  useEffect(() => {
    if (!isAuthenticated || !isAdmin()) {
      navigate('/login');
    }
  }, [isAuthenticated, isAdmin, navigate]);

  // Toggle dropdown
  const toggleDropdown = (id: string) => {
    setShowDropdownId(prevId => prevId === id ? null : id);
  };

  // Mock actions
  const handleAddMember = () => {
    toast({
      title: "Fonctionnalité à venir",
      description: "L'ajout de membres sera disponible prochainement.",
    });
  };

  const handleStatusChange = (id: string, newStatus: 'active' | 'inactive') => {
    setMembers(prevMembers =>
      prevMembers.map(member =>
        member.id === id ? { ...member, status: newStatus } : member
      )
    );
    
    toast({
      title: "Statut modifié",
      description: `Le statut a été mis à jour avec succès.`,
    });
    
    setShowDropdownId(null);
  };

  const handleDelete = (id: string) => {
    setMembers(prevMembers => prevMembers.filter(member => member.id !== id));
    
    toast({
      title: "Membre supprimé",
      description: "Le membre a été supprimé avec succès.",
    });
    
    setShowDropdownId(null);
  };

  return (
    <div className="page-container">
      <div className="sm:flex sm:items-center sm:justify-between mb-8">
        <h1 className="text-4xl font-bold text-center sm:text-left">Gestion des membres</h1>
        <div className="mt-4 sm:mt-0">
          <Button 
            onClick={handleAddMember}
            leftIcon={<Plus className="h-4 w-4" />}
          >
            Ajouter un membre
          </Button>
        </div>
      </div>
      
      {/* Search */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="Rechercher un membre..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      {/* Members table */}
      <div className="overflow-x-auto shadow-sm rounded-lg border">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Membre
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Rôle
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Statut
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date d'inscription
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredMembers.map((member) => (
              <tr key={member.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      {member.avatar ? (
                        <img 
                          className="h-10 w-10 rounded-full object-cover" 
                          src={member.avatar} 
                          alt="" 
                        />
                      ) : (
                        <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                          <span className="text-gray-500 font-medium">
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {member.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {member.email}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    member.role === 'admin' 
                      ? 'bg-purple-100 text-purple-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {member.role === 'admin' ? 'Administrateur' : 'Membre'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    member.status === 'active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {member.status === 'active' ? 'Actif' : 'Inactif'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {member.joinDate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="relative">
                    <button
                      onClick={() => toggleDropdown(member.id)}
                      className="text-gray-400 hover:text-gray-500"
                    >
                      <MoreHorizontal className="h-5 w-5" />
                    </button>
                    
                    {showDropdownId === member.id && (
                      <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                        <div className="py-1" role="menu" aria-orientation="vertical">
                          <button
                            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={() => handleStatusChange(member.id, member.status === 'active' ? 'inactive' : 'active')}
                          >
                            {member.status === 'active' ? (
                              <>
                                <XCircle className="mr-2 h-4 w-4 text-red-500" />
                                <span>Désactiver</span>
                              </>
                            ) : (
                              <>
                                <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                                <span>Activer</span>
                              </>
                            )}
                          </button>
                          <button
                            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={() => {
                              setShowDropdownId(null);
                              toast({
                                title: "Fonctionnalité à venir",
                                description: "La modification de membres sera disponible prochainement.",
                              });
                            }}
                          >
                            <Edit className="mr-2 h-4 w-4 text-blue-500" />
                            <span>Modifier</span>
                          </button>
                          <button
                            className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                            onClick={() => handleDelete(member.id)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            <span>Supprimer</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {filteredMembers.length === 0 && (
          <div className="px-6 py-10 text-center">
            <p className="text-gray-500">Aucun membre trouvé</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Members;

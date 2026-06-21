import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../lib/axios';

type Report = {
  id: number;
  title: string;
  content: string;
};

export default function Reports() {
  const queryClient = useQueryClient();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const { data: reports = [], isLoading } = useQuery<Report[]>({
    queryKey: ['reports'],
    queryFn: async () => {
      const response = await api.get('/reports');
      return response.data;
    },
  });

  const mutation = useMutation({
    mutationFn: async (newReport: Omit<Report, 'id'>) => {
      const response = await api.post('/reports', newReport);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reports'] });
      setTitle('');
      setContent('');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({ title, content });
  };

  return (
    <div className="p-6 bg-zinc-950 min-h-screen text-white">
      <h1 className="text-3xl font-bold uppercase tracking-wider mb-8 text-red-500">Relatórios</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold uppercase tracking-widest border-b border-zinc-800 pb-2">Lista de Relatórios</h2>
          {isLoading ? (
            <p className="text-zinc-500 uppercase text-sm">Carregando...</p>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {reports.map((report) => (
                <div key={report.id} className="border border-zinc-800 p-4 bg-black rounded-sm hover:border-red-900 transition-colors">
                  <h3 className="font-bold text-lg mb-2">{report.title}</h3>
                  <p className="text-zinc-400 text-sm whitespace-pre-wrap">{report.content}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <h2 className="text-xl font-semibold uppercase tracking-widest border-b border-zinc-800 pb-2 mb-4">Novo Relatório</h2>
          <form onSubmit={handleSubmit} className="space-y-4 bg-black p-6 border border-zinc-800 rounded-sm">
            <div>
              <label className="block text-xs uppercase text-zinc-500 mb-1">Título</label>
              <input
                type="text"
                placeholder="Título"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 text-white p-3 rounded-sm focus:outline-none focus:border-red-900 transition-colors"
                required
              />
            </div>
            <div>
              <label className="block text-xs uppercase text-zinc-500 mb-1">Conteúdo</label>
              <textarea
                placeholder="Markdown content..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full h-48 bg-zinc-950 border border-zinc-800 text-white p-3 rounded-sm focus:outline-none focus:border-red-900 transition-colors font-mono text-sm"
                required
              />
            </div>
            <button
              type="submit"
              disabled={mutation.isPending}
              className="w-full bg-red-900 hover:bg-red-800 text-white font-bold p-3 rounded-sm transition-colors uppercase tracking-widest mt-4 disabled:opacity-50"
            >
              {mutation.isPending ? 'Salvando...' : 'Salvar Relatório'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useNoteStore from "../store/useNoteStore";
import useAuthStore from "../store/useAuthStore.js";
import { Trash2 } from "lucide-react";

function DashboardPage() {
  const [expandedId, setExpandedId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [noteData, setNoteData]=useState({
    title:'',
    content:''
  })

  const { notes, getAllNotes }=useNoteStore();
  const { user, logout }=useAuthStore();

  useEffect(()=>{
    getAllNotes();
  },[])

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="mx-auto max-w-xl md:max-w-4xl flex flex-col min-h-screen">
        <div className="flex items-center justify-between mb-6 shrink-0">
          <h1 className="text-lg md:text-2xl font-semibold">Dashboard</h1>
          <div 
          className="text-sm text-blue-600 hover:underline cursor-pointer"
          onClick={()=>logout()}
          >
            Log Out
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm mb-5 shrink-0">
          <h2 className="font-bold text-lg md:text-xl">
            Welcome!
          </h2>
          <p className="text-sm text-gray-500 mt-1">Email: {user.email}</p>
        </div>

        <div className="mb-5 shrink-0">
          <div className="flex justify-center">
            <button
              onClick={() => setShowForm((prev) => !prev)}
              className="w-full md:w-1/2 bg-blue-600 text-white rounded-lg py-3 flex items-center justify-center gap-3 hover:bg-blue-700 transition"
            >
              {showForm ? "Cancel" : "Create Note"}
            </button>
          </div>

          <AnimatePresence>
            {showForm && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="mt-4 bg-white p-4 rounded-lg shadow-sm space-y-3"
              >
                <input
                  type="text"
                  placeholder="Enter title"
                  value={noteData.title}
                  onChange={(e) => setNoteData({...noteData, title:e.target.value})}
                  className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                <textarea
                  placeholder="Enter content"
                  value={noteData.content}
                  onChange={(e) => setNoteData({...noteData, content:e.target.value})}
                  rows={4}
                  className="w-full border border-gray-300 rounded-lg p-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="flex justify-end">
                  <button 
                  className="w-16 bg-blue-600 text-white rounded-lg py-2 hover:bg-blue-700 transition"
                  >
                    Create
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex flex-col">
          <h3 className="text-sm text-gray-700 font-medium mb-3 shrink-0">Notes</h3>

          <div className="space-y-3">
            {notes?.map((note) => (
                <motion.div
                  key={note._id}
                  layout
                  onClick={() =>
                    setExpandedId(expandedId === note._id ? null : note._id)
                  }
                  aria-expanded={expandedId === note._id}
                  className="bg-white rounded-lg p-3 shadow-sm flex items-start justify-between cursor-pointer"
                >
                  <div className="flex-1 pr-3 overflow-hidden">
                    <div className="font-medium text-gray-800 truncate">
                      {note.title}
                    </div>

                    <div className="mt-1 text-gray-600">
                      <AnimatePresence initial={false} mode="wait">
                      {expandedId !== note._id ? (
                        <motion.p
                          key={`${note._id}-collapsed`}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.15 }}
                          className="text-xs text-gray-500 line-clamp-3"
                          >
                              {note.content}
                          </motion.p>
                              ) : (
                          <motion.div
                                key={`${note._id}-expanded`}
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.2 }}
                          >
                            <p className="text-sm text-gray-700 whitespace-pre-wrap">
                                {note.content}
                            </p>
                          </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                <div
                className="p-2 rounded-md hover:bg-gray-100 text-gray-600 hover:text-red-600 transition"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteNote(note._id);
                }}
                >
                <Trash2 className="w-5 h-5" />
              </div>
            </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;

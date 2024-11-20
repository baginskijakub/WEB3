import React, { useState } from 'react';

interface CreateLobbyModalProps {
    onCreateLobby: (lobbyName: string) => void;
}

const CreateLobbyModal: React.FC<CreateLobbyModalProps> = ({ onCreateLobby }) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [lobbyName, setLobbyName] = useState<string>('');

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setLobbyName('');
    };

    const handleCreateLobby = () => {
        if (lobbyName.trim()) {
            onCreateLobby(lobbyName);
            closeModal();
        } else {
            alert('Please enter a valid lobby name.');
        }
    };

    return (
        <>
            {/* Button to Open Modal */}
            <button
                onClick={openModal}
                className="px-3 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800 transition-colors"
            >
                Create Lobby
            </button>

            {isModalOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                    onClick={closeModal} // Close modal when clicking outside the modal content
                >
                    <div
                        className="bg-white w-80 p-6 flex flex-col gap-4 rounded-lg shadow-lg"
                        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
                    >
                        <h2 className="text-xl font-semibold text-center text-gray-700">Create Lobby</h2>

                        <div className="flex flex-col gap-1">
                            <label htmlFor="lobby-name" className="text-sm text-gray-700">
                                Lobby Name
                            </label>
                            <input
                                id="lobby-name"
                                type="text"
                                value={lobbyName}
                                onChange={(e) => setLobbyName(e.target.value)}
                                className="p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-gray-700"
                                placeholder="Enter lobby name"
                                required
                            />
                        </div>

                        <div className="flex justify-between">
                            <button
                                onClick={closeModal}
                                className="px-4 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleCreateLobby}
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                            >
                                Create
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default CreateLobbyModal;

interface ModalProps {
    onClose: () => void
}

export default function Modal({ onClose }: ModalProps) {

    return (
        <div className="modal-overlay">
                <div className="modal">
                    <h2>🎉 Tenzi! 🎉</h2>
                    <p>You won! All dice show the same number!</p>
                    <button 
                        className="modal-close-button"
                        onClick={onClose}
                        autoFocus
                    >
                        Close
                    </button>
                </div>
            </div>
    )
}

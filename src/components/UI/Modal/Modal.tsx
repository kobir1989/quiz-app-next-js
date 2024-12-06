import Button from '@/components/UI/Button'
import { ModalProps } from '@/types/global'
import { IoMdClose } from 'react-icons/io'

const Modal = ({ children, onClose, onSave, onCancel }: ModalProps) => {
  return (
    <>
      {/* Backdrop */}
      <div
        className='fixed inset-0 z-50 bg-black/50 backdrop-blur-sm'
        onClick={onClose}
      />

      {/* Modal */}
      <div className='fixed inset-0 z-50 flex items-center justify-center'>
        <div className='relative w-full h-full sm:h-auto sm:max-w-lg bg-white sm:rounded-lg shadow-lg p-6'>
          {/* Close button */}
          <button
            onClick={onClose}
            className='absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors'
          >
            <IoMdClose size={24} />
          </button>

          {/* Content */}
          <div className='mt-2'>{children}</div>

          {/* Actions */}
          <div className='flex justify-end gap-4 mt-6'>
            <Button onClick={onCancel} variant='secondary'>
              Cancel
            </Button>
            <Button variant='primary' onClick={onSave}>
              Save
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Modal

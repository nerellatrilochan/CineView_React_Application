import { YOUTUBE_EMBED_BASE_URL } from '../../../core/constants/Tmdb.constants'
import { Modal } from '../Modal'
import { StyledIframe, StyledVideoWrapper } from './StyledComponents'

interface TrailerModalProps {
  isOpen: boolean
  youtubeKey: string | null
  title: string
  onClose: () => void
}

export const TrailerModal = ({
  isOpen,
  youtubeKey,
  title,
  onClose,
}: TrailerModalProps) => (
  <Modal isOpen={isOpen} onClose={onClose} ariaLabel={`${title} trailer`}>
    {youtubeKey && (
      <StyledVideoWrapper>
        <StyledIframe
          src={`${YOUTUBE_EMBED_BASE_URL}/${youtubeKey}?autoplay=1`}
          title={`${title} trailer`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </StyledVideoWrapper>
    )}
  </Modal>
)
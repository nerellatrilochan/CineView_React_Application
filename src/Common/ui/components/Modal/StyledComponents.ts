import styled from 'styled-components'

export const StyledOverlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(2, 6, 23, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  z-index: 50;
`

export const StyledDialog = styled.div`
  position: relative;
  width: min(56rem, 100%);
  background-color: #0f172a;
  border-radius: 0.75rem;
  border: 1px solid #334155;
  overflow: hidden;
`

export const StyledCloseButton = styled.button`
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  z-index: 1;
  width: 2rem;
  height: 2rem;
  border: none;
  border-radius: 9999px;
  background-color: rgba(15, 23, 42, 0.9);
  color: #f8fafc;
  cursor: pointer;
  font-size: 1.25rem;
  line-height: 1;

  &:hover {
    background-color: #1e293b;
  }
`
import styled from 'styled-components';

export const AuthError = styled.p`
  &&& {
    color: #fa4242;
    background-color:#f1f0ff;
    text-align: center;
    padding: 6px 0;
    border-radius: 3px;
    overflow-y: hidden;
	max-height: 500px;
	transition-property: all;
	transition-duration: .5s;
    transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
    .opened {
	max-height: 0;
}
  }
`;
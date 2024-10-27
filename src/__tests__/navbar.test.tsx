import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; 
import Navbar from '../components/landing-page/navbar';
describe('Navbar Component', () => {
    it('should render the correct text', () => {
      render(<Navbar />);
      const textElement = screen.getByText('Duro Stores');
      expect(textElement).toBeInTheDocument(); 
    });
  
    it('should have correct styles', () => {
      render(<Navbar />);
      const textElement = screen.getByText('Duro Stores');
      expect(textElement).toHaveClass('text-[#00000080]', 'font-bold', 'p-4', 'shadow-md');
    });
  });
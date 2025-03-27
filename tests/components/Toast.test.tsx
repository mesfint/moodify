// import { render, screen } from '@testing-library/react';
// import React, { createContext, ReactNode } from 'react';
// import { describe, expect, it } from 'vitest';
// import Toast from '../../src/component/Toast';
// import { useMoodify } from '../../src/hooks/useMoodify';
// import { MoodifyContext } from '../../src/contexts/MoodifyContext';

// type TestMoodifyContextType = {
//   notification: { message: string; visible: boolean };
//   // Add minimal defaults for required fields
//   songs: any[];
//   playSong: () => void; // Stub
//   children: ReactNode
// };

// const TestMoodifyProvider = ({ notification, children }:TestMoodifyContextType) => {
//   <MoodifyContext.Provider value={
//     notification, songs: [],
//     playSong: () => {},}>

//     {children}
//   </MoodifyContext.Provider>;
// };
// describe('Toast', () => {
//   it('Does not render when notification is not visible', () => {
//     const { notification } = useMoodify();

//     render(<TestMoodifyProvider notification={ message:"Test", visible:false} />);
//     expect(screen.queryByText('est')).toBeInTheDocument();
//   });
// });

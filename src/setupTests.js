// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

jest.mock('framer-motion', () => {
  const React = require('react');

  const createMotionComponent = (tag) =>
    React.forwardRef(
      (
        {
          animate,
          children,
          initial,
          transition,
          variants,
          viewport,
          whileHover,
          whileInView,
          whileTap,
          ...props
        },
        ref
      ) => React.createElement(tag, { ...props, ref }, children)
    );

  return {
    motion: new Proxy(
      {},
      {
        get: (_, tag) => createMotionComponent(tag),
      }
    ),
  };
});

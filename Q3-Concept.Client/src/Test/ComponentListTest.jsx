import { render, fireEvent } from '../test-utils';
import {rest} from 'msw'
import {setupServer} from 'msw/node'

import ComponentList from "../Components/ComponentList"
import '@testing-library/react'

const server = setupServer(
    rest.get('/', (req, res, ctx) => {
      return res(ctx.json({greeting: 'hello there'}))
    }),
  )
    beforeAll(() => server.listen())
    afterEach(() => server.resetHandlers())
    afterAll(() => server.close())

    test('loads and displays greeting', async () => {
        render(<Fetch url="/greeting" />)
      
        fireEvent.click(screen.getByText('Load Greeting'))
      
        await waitFor(() => screen.getByRole('heading'))
      
        expect(screen.getByRole('heading')).toHaveTextContent('hello there')
        expect(screen.getByRole('button')).toBeDisabled()
      })
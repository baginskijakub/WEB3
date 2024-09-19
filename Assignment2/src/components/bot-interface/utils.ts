type Position = 'left' | 'top' | 'right'

export const POSITION_MAP: Record<Position, string> = {
  left: 'p-4 bg-gray-800 text-white left-0 top-1/2 transform -translate-y-1/2 w-4 h-12',
  top: 'p-4 bg-gray-800 text-white top-0 left-1/2 transform -translate-x-1/2 h-4 w-12',
  right: 'p-4 bg-gray-800 text-white right-0 top-1/2 transform -translate-y-1/2 w-4 h-12',
}

export const POSITIONS_ARRAY: Position[][] = [['top'], ['left', 'right'], ['left', 'top', 'right']]

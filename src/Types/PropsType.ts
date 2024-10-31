export interface Payload {
    id: string;
    name: string;
    role: string;
    iat: number;
    exp: number;
  }


  export interface RatingProps {
    className?: string;
    count?: number;
    value: number;
    color?: string;
    hoverColor?: string;
    activeColor?: string;
    size?: number;
    edit?: boolean;
    isHalf?: boolean;
    onChange?: (value: number) => void;
    emptyIcon?: React.ReactElement;
    halfIcon?: React.ReactElement;
    fullIcon?: React.ReactElement;
  }
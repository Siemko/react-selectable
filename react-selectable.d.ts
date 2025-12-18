import * as React from 'react';

declare module 'react-selectable' {
    interface SelectableGroupProps {
        onSelection?: (selectedItems: Array<any>, event: MouseEvent) => void;
        onNonItemClick?: (event: MouseEvent) => void;
        onBeginSelection?: (event: MouseEvent) => boolean | void;
        onEndSelection?: (selectedItems: Array<any>, event: MouseEvent) => void;
        onBeginDrag?: (event: MouseEvent) => void;
        selectingClassName?: string;
        tolerance?: number;
        component?: string;
        fixedPosition?: boolean;
        preventDefault?: boolean;
        enabled?: boolean;
        className?: string;
        children?: React.ReactNode;
    }

    interface SelectableComponentProps {
        key?: number | string;
        selected?: boolean;
        selectableKey: number | string;
        children?: React.ReactNode;
        [key: string]: any;
    }

    interface SelectableContextValue {
        register: (key: any, domNode: HTMLElement) => void;
        unregister: (key: any) => void;
    }

    export class SelectableGroup extends React.Component<SelectableGroupProps> {}

    export class SelectableComponent extends React.Component<SelectableComponentProps> {}

    export function createSelectable<P extends object>(
        component: React.ComponentType<P & { ref?: React.Ref<any> }>
    ): React.ComponentType<P & { selectableKey: any }>;

    export const SelectableContext: React.Context<SelectableContextValue | null>;

    export function isNodeIn(node: Node, predicate: (node: Node) => boolean): boolean;

    export function nodeInRoot(node: Node, root: Node): boolean;
}

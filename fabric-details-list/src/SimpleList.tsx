// SimpleList.tsx - Simple detailsList Component example

import React from 'react';

import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
import { DetailsList, DetailsListLayoutMode, Selection, IColumn } from 'office-ui-fabric-react/lib/DetailsList';
import { MarqueeSelection } from 'office-ui-fabric-react/lib/MarqueeSelection';
import { mergeStyles } from 'office-ui-fabric-react/lib/Styling';

import { ICustomer } from './interfaces';

const childClass = mergeStyles({
    display: 'block',
    padding: '10px'
});

export interface ISimpleListState {
    items : ICustomer[];
    selectionDetails : {};
}


export default class SimpleList extends React.Component<{}, ISimpleListState> {
    private columns : IColumn[];

    private selection : Selection;

    private getSelectionDetails() : string {
        let count : number = this.selection.getSelectedCount();

        switch(count) {
            case(0):
                return "No Items Selected";
            case(1):
                return "1 Item Selected";
            default:
                return `${ count } items selected!`
                    
        }
    }

    constructor(props : {}) {
        super(props);

        this.selection = new Selection({
            onSelectionChanged: () => {
                this.setState({
                    selectionDetails: this.getSelectionDetails()
                });
            }
        });

        this.columns = [
            { key : "id", name: "id", fieldName : "id", minWidth: 100, maxWidth: 100, isResizable: true},
            { key : "name", name: "name", fieldName : "name", minWidth: 250, maxWidth: 300, isResizable: true},
            { key : "website", name: "website", fieldName : "website", minWidth: 250, maxWidth: 350, isResizable: true}
        ];

        this.state = {
            selectionDetails : this.getSelectionDetails(),
            items: [
                { id: 1, name : "JBR & CO.", website: "www.jbr.com" },
                { id: 2, name : "ABC Limited", website: "www.abc.com" },
                { id: 3, name : "PAC LLP", website: "www.pac.com" },
                { id: 4, name : "PQR and Company.", website: "www.pqr.com.br" },
                { id: 5, name : "Legman Bros.", website: "www.legman.com" },
                { id: 6, name : "Mustafa Inc.", website: "www.mustafa.com" }
            ]
        }
    }

    public render() : JSX.Element {
        return (
            <Fabric>
                <MarqueeSelection selection={ this.selection }>
                    <DetailsList items={ this.state.items } columns={ this.columns } setKey="set" 
                        layoutMode={ DetailsListLayoutMode.justified }
                        ariaLabelForSelectionColumn="Toggle selection" 
                        ariaLabelForSelectAllCheckbox="Toggle selection for all items" 
                        checkButtonAriaLabel="Row checkbox"
                    />
                </MarqueeSelection>
            </Fabric>
        )
    }
}
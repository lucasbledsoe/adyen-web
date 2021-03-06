import { h } from 'preact';
import UIElement from '../UIElement';
import IssuerList from '../internal/IssuerList';
import getIssuerImageUrl from '~/utils/get-issuer-image';
import { FALLBACK_CONTEXT } from '~/core/config';
import CoreProvider from '~/core/Context/CoreProvider';
import Language from '~/language/Language';

interface IssuerListProps {
    showImage?: boolean;
    items?: IssuerItem[];
    details?: { key: string; items: IssuerItem[] };
    i18n: Language;
    loadingContext: string;
}

interface IssuerItem {
    id: string;
    name: string;
}

interface IssuerListData {
    paymentMethod: {
        type: string;
        issuer: string;
    };
}

/**
 * IssuerListContainer: A higher order function which returns a different class based on issuerType
 * @extends UIElement
 */
const withIssuerList = ({ type, showImage = true }): any => {
    class IssuerListContainer extends UIElement {
        public static type = type;
        public props: IssuerListProps;

        constructor(props: IssuerListProps) {
            super(props);

            if (this.props.showImage) {
                const getIssuerIcon = getIssuerImageUrl({ loadingContext: this.props.loadingContext }, IssuerListContainer.type);

                this.props.items = this.props.items.map(item => ({
                    ...item,
                    icon: getIssuerIcon(item.id)
                }));
            }
        }

        protected static defaultProps = {
            showImage,
            onValid: () => {},
            items: [],
            loadingContext: FALLBACK_CONTEXT
        };

        /**
         * Formats props on construction time
         * @return {object} props
         */
        formatProps(props) {
            return {
                ...props,
                items: props.details && props.details.length ? (props.details.find(d => d.key === 'issuer') || {}).items : props.items
            };
        }

        /**
         * Formats the component data output
         * @return {object} props
         */
        formatData(): IssuerListData {
            return {
                paymentMethod: {
                    type: IssuerListContainer.type,
                    issuer: this.state.issuer
                }
            };
        }

        /**
         * Returns whether the component state is valid or not
         * @return {boolean} isValid
         */
        get isValid() {
            return !!this.state && !!this.state.issuer;
        }

        render() {
            return (
                <CoreProvider i18n={this.props.i18n} loadingContext={this.props.loadingContext}>
                    <IssuerList
                        ref={ref => {
                            this.componentRef = ref;
                        }}
                        {...this.props}
                        {...this.state}
                        onChange={this.setState}
                        onSubmit={this.submit}
                        payButton={this.payButton}
                    />
                </CoreProvider>
            );
        }
    }

    return IssuerListContainer;
};

export default withIssuerList;

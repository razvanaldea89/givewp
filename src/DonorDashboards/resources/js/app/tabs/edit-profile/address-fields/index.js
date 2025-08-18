import { Fragment, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setStates } from '../../../store/actions';
import { __ } from '@wordpress/i18n';

import SelectControl from '../../../components/select-control';
import TextControl from '../../../components/text-control';
import FieldRow from '../../../components/field-row';

import { fetchStatesWithAPI } from '../utils';

const AddressFields = ({ address, onChange }) => {
    useEffect(() => {
        setCountry(address.country);
        setLine1(address.line1);
        setLine2(address.line2);
        setCity(address.city);
        setState(address.state);
        setZip(address.zip);
        setPersoana(address.persoana);
        setCui(address.cui);
        setJ(address.j);
    }, [address]);

    const dispatch = useDispatch();
    const countryOptions = useSelector((state) => state.countries);
    const stateOptions = useSelector((state) => state.states);

    const [country, setCountry] = useState(address.country);
    const [line1, setLine1] = useState(address.line1);
    const [line2, setLine2] = useState(address.line2);
    const [city, setCity] = useState(address.city);
    const [state, setState] = useState(address.state);
    const [zip, setZip] = useState(address.zip);
    const [persoana, setPersoana] = useState(address.persoana);
    const [cui, setCui] = useState(address.cui);
    const [j, setJ] = useState(address.j);
    const [displayFields, setDisplayFields] = useState(false);

    const updateStates = async (countryCode) => {
        if (countryCode) {
            const newStates = await fetchStatesWithAPI(countryCode);
            dispatch(setStates(newStates));
        }
    };

    useEffect(() => {
        updateStates(country);
    }, [country]);

    useEffect(() => {
        const newAddress = {
            country,
            line1,
            line2,
            state,
            city,
            zip,
            persoana,
            cui,
            j,
        };
        onChange(newAddress);
    }, [country, line1, line2, state, city, zip, persoana, cui, j]);

    const personaOptions = [
        { value: '', label: __('Selectează tipul de persoană', 'give') },
        { value: 'persoana_fizica', label: __('Persoană Fizică', 'give') },
        { value: 'persoana_juridica', label: __('Persoană Juridică', 'give') },
    ];

    const persoanaActions = (value) => {
        setPersoana(value);
        console.log(value);
        if (value === 'persoana_fizica') {
            // Hide CUI and J fields for Persoană Fizică
            setDisplayFields(false);
        } else if (value === 'persoana_juridica') {
            // Show CUI and J fields for Persoană Juridică
            setDisplayFields(true);
        }
    };

    return (
        <Fragment>
            <SelectControl
                label={__('Country', 'give')}
                value={country}
                onChange={(value) => setCountry(value)}
                options={countryOptions}
                width={null}
            />
            <TextControl label={__('Address 1', 'give')} value={line1} onChange={(value) => setLine1(value)}/>
            <TextControl label={__('City', 'give')} value={city} onChange={(value) => setCity(value)}/>
            <SelectControl
                label={__('Tip persoana', 'give')}
                value={persoana}
                onChange={persoanaActions}
                options={personaOptions}
                width={null}
            />
            {displayFields && (
                <TextControl label={__('CUI', 'give')} value={cui} onChange={(value) => setCui(value)}/>)}
            {displayFields && (
                <TextControl label={__('Număr de înregistrare', 'give')} value={j} onChange={(value) => setJ(value)}/>)}
            <FieldRow>
                <SelectControl
                    label={__('State', 'give')}
                    value={state}
                    onChange={(value) => setState(value)}
                    options={stateOptions}
                />
                <TextControl label={__('Zip', 'give')} value={zip} onChange={(value) => setZip(value)}/>
            </FieldRow>
        </Fragment>
    );
};

export default AddressFields;

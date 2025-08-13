// Internal dependencies
import { registerAnnualReceiptsTab } from './annual-receipts';
import { registerDashboardTab } from './dashboard';
import { registerDonationHistoryTab } from './donation-history';
import { registerEditProfileTab } from './edit-profile';
import { registerRecurringDonationsTab } from './recurring-donations';
import { getWindowData, isDonor } from '../utils';

export const registerDefaultTabs = () => {

    // Dashboard Tab should always register
    registerDashboardTab();
    // Make sure that Edit Profile tab is registered first
    registerEditProfileTab();
    let tabRegistrationMap = {};

    tabRegistrationMap = {
        'donation-history': registerDonationHistoryTab,
        'annual-receipts': registerAnnualReceiptsTab,
        'recurring-donations': registerRecurringDonationsTab,
    };

    const registeredTabs = getWindowData('registeredTabs');

    registeredTabs.forEach((tab) => {
        if (tabRegistrationMap[tab]) {
            tabRegistrationMap[tab]();
        }
    });
};

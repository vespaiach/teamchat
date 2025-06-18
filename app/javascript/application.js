import { Turbo } from '@hotwired/turbo-rails';
import 'controllers';
import * as ActiveStorage from '@rails/activestorage';

ActiveStorage.start();
Turbo.start();

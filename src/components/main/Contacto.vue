<script lang="ts" setup>
import { ref } from 'vue';
import { getLangFromUrl, useTranslations } from '../../i18n/utils';
import VueHcaptcha from '@hcaptcha/vue3-hcaptcha';
import { Form as VeeForm, Field, ErrorMessage, type SubmissionHandler, type GenericObject } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/valibot';
import { ContactFormRequestSchema, type ContactFormRequest } from '@/schemas/contact-from-request.schema';
import { parse } from 'valibot';
import { useToast } from '@/components/ui/toast';
import Toaster from '@/components/ui/toast/Toaster.vue'


const { toast } = useToast()

const formSchema = toTypedSchema(ContactFormRequestSchema as any);

const props = defineProps({
    url: {
        required: true,
        type: String
    },
    sitekey: {
        required: true,
        type: String
    }
});
const lang = getLangFromUrl(props.url);
const t = useTranslations(lang);
const sitekey = props.sitekey;

const verified = ref(false);
const expired = ref(false);
const token = ref("");
const eKey = ref("");
const error = ref("");
const hcaptcharef = ref<VueHcaptcha|null>(null);


function onVerify(tokenStr: string, ekey: string) {
  verified.value = true;
  token.value = tokenStr;
  eKey.value = ekey;
}

function onExpire() {
  verified.value = false;
  token.value = '';
  eKey.value = '';
  expired.value = true;
  console.log('Expired');
}

function onChallengeExpire() {
  verified.value = false;
  token.value = '';
  eKey.value = '';
  expired.value = true;
  console.log('Challenge expired');
}

function onError(err: string) {
  token.value = '';
  eKey.value = '';
  error.value = err;
  console.error(`Error with the hcaptcha: ${err}`);
}


const submitHandler: SubmissionHandler<GenericObject> = async (data: GenericObject, ctx) => {

    if(token.value === '') {
        hcaptcharef.value!.execute();
        return;
    }

    let dataParsed: ContactFormRequest;
    try {
        dataParsed = parse(ContactFormRequestSchema, data);
    } catch(ex) {
        console.error('Some of the fields are invalid', data);
        return;
    }

    try {

        await fetch('/api/contact-form', {
            method: 'POST',
            body: JSON.stringify(dataParsed)
        }).then((r) => r.json());
        
    } catch(ex) {
        toast({
            title: t('contact.toast.error_title'),
            description: t('contact.toast.error_content'),
            variant: 'destructive',
            duration: 5000
        })
        console.error('Error when sending the form:', ex);
        return;
    }

    toast({
            title: t('contact.toast.success_title'),
            description: t('contact.toast.success_content'),
            duration: 5000,
            class: 'bg-green-600 text-white'
    })
    onChallengeExpire();
    hcaptcharef.value!.reset();
    ctx.resetForm();


    
}

</script>



<template>
    <section class="bg-bubble h-full w-full fade-in-section">
        <div class="relative py-3 sm:max-w-xl md:max-w-2xl sm:mx-auto">
            <div class="relative px-4 py-10 bg-white dark:bg-transparent shadow-lg sm:rounded-3xl sm:p-20 bg-clip-padding bg-opacity-60 border dark:border-gray-800 border-gray-200 backdrop-blur-xl subpixel-antialiased">
                <div class="max-w-md mx-auto">
                    <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-slate-200 ">{{ t('contact.title') }}</h2>
                    <p class="mb-8 lg:mb-16 font-light text-center text-gray-500 sm:text-xl dark:text-slate-200">
                        {{ t('contact.description') }}
                    </p>
                    <VeeForm v-slot="{ handleSubmit, values, errors, isSubmitting }" :validation-schema="formSchema" as="div">
                        <form class="space-y-8" @submit="handleSubmit($event, submitHandler)" >
                            <div>
                                <label for="name" class="block mb-2 text-sm font-medium text-gray-900  dark:text-slate-200">{{ t('contact.form.name') }}</label>
                                <Field name="name" type="text" id="name" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5" />
                                <ErrorMessage name="name" class="text-red-600">
                                    <span class="text-red-600">{{ t('contact.form.invalid_value') }}</span>
                                </ErrorMessage>
                            </div>
                            <div>
                                <label for="email" class="block mb-2 text-sm font-medium text-gray-900  dark:text-slate-200">Email</label>
                                <Field name="email" type="email" id="email" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5" :placeholder="t('contact.form.email_placeholder')" />
                                <ErrorMessage name="email" class="text-red-600">
                                    <span class="text-red-600">{{ t('contact.form.invalid_value') }}</span>
                                </ErrorMessage>
                            </div>
                            <div>
                                <label for="subject" class="block mb-2 text-sm font-medium text-gray-900  dark:text-slate-200">{{ t('contact.form.subject') }}</label>
                                <Field name="subject" type="text" id="subject" class="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500" :placeholder="t('contact.form.subject')" />
                                <ErrorMessage name="subject" class="text-red-600">
                                    <span class="text-red-600">{{ t('contact.form.invalid_value') }}</span>
                                </ErrorMessage>
                            </div>
                            <div class="sm:col-span-2">
                                <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-slate-200 ">{{ t('contact.form.message')  }}</label>
                                <Field v-slot="{ field }" name="message">
                                    <textarea v-bind="field" name="message" id="message" rows={6} class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500" :placeholder="t('contact.form.message')"></textarea>
                                </Field>
                                <ErrorMessage name="message" class="text-red-600">
                                    <span class="text-red-600">{{ t('contact.form.invalid_value') }}</span>
                                </ErrorMessage>
                            </div>

                            <div class="sm:col-span-2">
                                
                                <vue-hcaptcha
                                    ref="hcaptcharef"
                                    theme="light"
                                    :sitekey="sitekey"
                                    :language="lang"
                                    @verify="onVerify"
                                    @expired="onExpire"
                                    @challengeExpired="onChallengeExpire"
                                    @error="onError"
                                />
                                <Field name="token" type="hidden" v-model="token" />
                            </div>

                            <button type="submit" :disabled="isSubmitting" class="flex gap-2 align-middle py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-blue-600 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 disabled:opacity-50 disabled:cursor-wait">
                                <span>
                                    {{ t('contact.form.send') }}
                                </span>
                                <span class="inline-block self-center" v-if="isSubmitting">
                                    <svg aria-hidden="true" class="w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                    </svg>
                                </span>

                            </button>
                        </form>
                    </VeeForm>
                </div>
            </div>
        </div>
        <Toaster />
    </section>
</template>

<style>
    .bg-bubble {
        background-image: url('/img/bubble.svg');
        background-repeat: no-repeat;
        background-position: center;
        background-size:contain;
    }

    input:focus-visible, textarea:focus-visible {
		outline: none;
	}
</style>
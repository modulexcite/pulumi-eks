import * as eks from "@pulumi/eks";
import * as pulumi from "@pulumi/pulumi";
import * as process from "process";

const projectName = pulumi.getProject();

if (!process.env.AWS_PROFILE) {
    throw new Error("AWS_PROFILE must be set");
}
const profileName = process.env.AWS_PROFILE;

const kubeconfigOpts: eks.KubeconfigOptions = {profileName: profileName};
const cluster = new eks.Cluster(`${projectName}`, {
    providerCredentialOpts: kubeconfigOpts,
    deployDashboard: false,
});

// Export the cluster kubeconfig.
export const kubeconfig = cluster.kubeconfig;
